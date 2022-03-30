// metadata
export const version = "0.8.10"
export const title = "Payable"
export const description = "An example of how to use the keyword payable in Solidity"

const html = `<p>Functions and addresses declared <code>payable</code> can receive <code>ether</code> into the contract.</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Payable</span> </span>{
    <span class="hljs-comment">// Payable address can receive Ether</span>
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">payable</span> <span class="hljs-keyword">public</span> owner;

    <span class="hljs-comment">// Payable constructor can receive Ether</span>
    <span class="hljs-function"><span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">payable</span></span> </span>{
        owner <span class="hljs-operator">=</span> <span class="hljs-keyword">payable</span>(<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>);
    }

    <span class="hljs-comment">// Function to deposit Ether into this contract.</span>
    <span class="hljs-comment">// Call this function along with some Ether.</span>
    <span class="hljs-comment">// The balance of this contract will be automatically updated.</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deposit</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">payable</span></span> </span>{}

    <span class="hljs-comment">// Call this function along with some Ether.</span>
    <span class="hljs-comment">// The function will throw an error since this function is not payable.</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">notPayable</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{}

    <span class="hljs-comment">// Function to withdraw all Ether from this contract.</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withdraw</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-comment">// get the amount of Ether stored in this contract</span>
        <span class="hljs-keyword">uint</span> amount <span class="hljs-operator">=</span> <span class="hljs-keyword">address</span>(<span class="hljs-built_in">this</span>).<span class="hljs-built_in">balance</span>;

        <span class="hljs-comment">// send all Ether to owner</span>
        <span class="hljs-comment">// Owner can receive Ether since the address of owner is payable</span>
        (<span class="hljs-keyword">bool</span> success, ) <span class="hljs-operator">=</span> owner.<span class="hljs-built_in">call</span>{<span class="hljs-built_in">value</span>: amount}(<span class="hljs-string">""</span>);
        <span class="hljs-built_in">require</span>(success, <span class="hljs-string">"Failed to send Ether"</span>);
    }

    <span class="hljs-comment">// Function to transfer Ether from this contract to address from input</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">transfer</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> <span class="hljs-keyword">payable</span> _to, <span class="hljs-keyword">uint</span> _amount</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-comment">// Note that "to" is declared as payable</span>
        (<span class="hljs-keyword">bool</span> success, ) <span class="hljs-operator">=</span> _to.<span class="hljs-built_in">call</span>{<span class="hljs-built_in">value</span>: _amount}(<span class="hljs-string">""</span>);
        <span class="hljs-built_in">require</span>(success, <span class="hljs-string">"Failed to send Ether"</span>);
    }
}
</code></pre>
`

export default html
