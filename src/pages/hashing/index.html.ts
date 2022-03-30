// metadata
export const version = "0.8.10"
export const title = "Hashing with Keccak256"
export const description = "Example of hashing using Keccak256 in Solidity"

const html = `<p><code>keccak256</code> computes the Keccak-256 hash of the input.</p>
<p>Some use cases are:</p>
<ul>
<li>Creating a deterministic unique ID from a input</li>
<li>Commit-Reveal scheme</li>
<li>Compact cryptographic signature (by signing the hash instead of a larger input)</li>
</ul>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">HashFunction</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hash</span>(<span class="hljs-params">
        <span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span> _text,
        <span class="hljs-keyword">uint</span> _num,
        <span class="hljs-keyword">address</span> _addr
    </span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bytes32</span></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">keccak256</span>(<span class="hljs-built_in">abi</span>.<span class="hljs-built_in">encodePacked</span>(_text, _num, _addr));
    }

    <span class="hljs-comment">// Example of hash collision</span>
    <span class="hljs-comment">// Hash collision can occur when you pass more than one dynamic data type</span>
    <span class="hljs-comment">// to abi.encodePacked. In such case, you should use abi.encode instead.</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">collision</span>(<span class="hljs-params"><span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span> _text, <span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span> _anotherText</span>)
        <span class="hljs-title"><span class="hljs-keyword">public</span></span>
        <span class="hljs-title"><span class="hljs-keyword">pure</span></span>
        <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bytes32</span></span>)
    </span>{
        <span class="hljs-comment">// encodePacked(AAA, BBB) -&gt; AAABBB</span>
        <span class="hljs-comment">// encodePacked(AA, ABBB) -&gt; AAABBB</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">keccak256</span>(<span class="hljs-built_in">abi</span>.<span class="hljs-built_in">encodePacked</span>(_text, _anotherText));
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">GuessTheMagicWord</span> </span>{
    <span class="hljs-keyword">bytes32</span> <span class="hljs-keyword">public</span> answer <span class="hljs-operator">=</span>
        <span class="hljs-number">0x60298f78cc0b47170ba79c10aa3851d7648bd96f2f8e46a19dbc777c36fb0c00</span>;

    <span class="hljs-comment">// Magic word is "Solidity"</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">guess</span>(<span class="hljs-params"><span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span> _word</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bool</span></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">keccak256</span>(<span class="hljs-built_in">abi</span>.<span class="hljs-built_in">encodePacked</span>(_word)) <span class="hljs-operator">=</span><span class="hljs-operator">=</span> answer;
    }
}
</code></pre>
`

export default html
