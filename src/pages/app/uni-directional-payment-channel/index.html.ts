// metadata
export const version = "0.8.10"
export const title = "Uni-Directional Payment Channel"
export const description = "An example of uni-directional payment channels in Solidity"

const html = `<p>Payment channels allow participants to repeatedly transfer Ether off chain.</p>
<p>Here is how this contract is used:</p>
<ul>
<li><code>Alice</code> deploys the contract, funding it with some Ether.</li>
<li><code>Alice</code> authorizes a payment by signing a message (off chain) and sends the signature to <code>Bob</code>.</li>
<li><code>Bob</code> claims his payment by presenting the signed message to the smart contract.</li>
<li>If <code>Bob</code> does not claim his payment, <code>Alice</code> get her Ether back after the contract expires</li>
</ul>
<p>This is called a uni-directional payment channel since the payment can go only in a single direction from <code>Alice</code> to <code>Bob</code>.</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">"github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/utils/cryptography/ECDSA.sol"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/security/ReentrancyGuard.sol"</span>;

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">UniDirectionalPaymentChannel</span> <span class="hljs-keyword">is</span> <span class="hljs-title">ReentrancyGuard</span> </span>{
    <span class="hljs-keyword">using</span> <span class="hljs-title">ECDSA</span> <span class="hljs-title"><span class="hljs-keyword">for</span></span> <span class="hljs-title"><span class="hljs-keyword">bytes32</span></span>;

    <span class="hljs-keyword">address</span> <span class="hljs-keyword">payable</span> <span class="hljs-keyword">public</span> sender;
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">payable</span> <span class="hljs-keyword">public</span> receiver;

    <span class="hljs-keyword">uint</span> <span class="hljs-keyword">private</span> <span class="hljs-keyword">constant</span> DURATION <span class="hljs-operator">=</span> <span class="hljs-number">7</span> <span class="hljs-operator">*</span> <span class="hljs-number">24</span> <span class="hljs-operator">*</span> <span class="hljs-number">60</span> <span class="hljs-operator">*</span> <span class="hljs-number">60</span>;
    <span class="hljs-keyword">uint</span> <span class="hljs-keyword">public</span> expiresAt;

    <span class="hljs-function"><span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> <span class="hljs-keyword">payable</span> _receiver</span>) <span class="hljs-title"><span class="hljs-keyword">payable</span></span> </span>{
        <span class="hljs-built_in">require</span>(_receiver <span class="hljs-operator">!</span><span class="hljs-operator">=</span> <span class="hljs-keyword">address</span>(<span class="hljs-number">0</span>), <span class="hljs-string">"receiver = zero address"</span>);
        sender <span class="hljs-operator">=</span> <span class="hljs-keyword">payable</span>(<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>);
        receiver <span class="hljs-operator">=</span> _receiver;
        expiresAt <span class="hljs-operator">=</span> <span class="hljs-built_in">block</span>.<span class="hljs-built_in">timestamp</span> <span class="hljs-operator">+</span> DURATION;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_getHash</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _amount</span>) <span class="hljs-title"><span class="hljs-keyword">private</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bytes32</span></span>) </span>{
        <span class="hljs-comment">// <span class="hljs-doctag">NOTE:</span> sign with address of this contract to protect agains</span>
        <span class="hljs-comment">// replay attack on other contracts</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">keccak256</span>(<span class="hljs-built_in">abi</span>.<span class="hljs-built_in">encodePacked</span>(<span class="hljs-keyword">address</span>(<span class="hljs-built_in">this</span>), _amount));
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getHash</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _amount</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bytes32</span></span>) </span>{
        <span class="hljs-keyword">return</span> _getHash(_amount);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_getEthSignedHash</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _amount</span>) <span class="hljs-title"><span class="hljs-keyword">private</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bytes32</span></span>) </span>{
        <span class="hljs-keyword">return</span> _getHash(_amount).toEthSignedMessageHash();
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getEthSignedHash</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _amount</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bytes32</span></span>) </span>{
        <span class="hljs-keyword">return</span> _getEthSignedHash(_amount);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_verify</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _amount, <span class="hljs-keyword">bytes</span> <span class="hljs-keyword">memory</span> _sig</span>) <span class="hljs-title"><span class="hljs-keyword">private</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bool</span></span>) </span>{
        <span class="hljs-keyword">return</span> _getEthSignedHash(_amount).recover(_sig) <span class="hljs-operator">=</span><span class="hljs-operator">=</span> sender;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">verify</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _amount, <span class="hljs-keyword">bytes</span> <span class="hljs-keyword">memory</span> _sig</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bool</span></span>) </span>{
        <span class="hljs-keyword">return</span> _verify(_amount, _sig);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">close</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _amount, <span class="hljs-keyword">bytes</span> <span class="hljs-keyword">memory</span> _sig</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title">nonReentrant</span> </span>{
        <span class="hljs-built_in">require</span>(<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span> <span class="hljs-operator">=</span><span class="hljs-operator">=</span> receiver, <span class="hljs-string">"!receiver"</span>);
        <span class="hljs-built_in">require</span>(_verify(_amount, _sig), <span class="hljs-string">"invalid sig"</span>);

        (<span class="hljs-keyword">bool</span> sent, ) <span class="hljs-operator">=</span> receiver.<span class="hljs-built_in">call</span>{<span class="hljs-built_in">value</span>: _amount}(<span class="hljs-string">""</span>);
        <span class="hljs-built_in">require</span>(sent, <span class="hljs-string">"Failed to send Ether"</span>);
        <span class="hljs-built_in">selfdestruct</span>(sender);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cancel</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> </span>{
        <span class="hljs-built_in">require</span>(<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span> <span class="hljs-operator">=</span><span class="hljs-operator">=</span> sender, <span class="hljs-string">"!sender"</span>);
        <span class="hljs-built_in">require</span>(<span class="hljs-built_in">block</span>.<span class="hljs-built_in">timestamp</span> <span class="hljs-operator">&gt;</span><span class="hljs-operator">=</span> expiresAt, <span class="hljs-string">"!expired"</span>);
        <span class="hljs-built_in">selfdestruct</span>(sender);
    }
}
</code></pre>
`

export default html
