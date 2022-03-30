// metadata
export const version = "0.8.10"
export const title = "Call"
export const description =
  "In Solidity call is a low level function to interact with other contracts"

const html = `<p><code>call</code> is a low level function to interact with other contracts.</p>
<p>This is the recommended method to use when you&#39;re just sending Ether via calling the <code>fallback</code> function.</p>
<p>However it is not the recommend way to call existing functions.</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Receiver</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">event</span> <span class="hljs-title">Received</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> caller, <span class="hljs-keyword">uint</span> amount, <span class="hljs-keyword">string</span> message</span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">fallback</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">payable</span></span> </span>{
        <span class="hljs-keyword">emit</span> Received(<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>, <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">value</span>, <span class="hljs-string">"Fallback was called"</span>);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"><span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span> _message, <span class="hljs-keyword">uint</span> _x</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">payable</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span></span>) </span>{
        <span class="hljs-keyword">emit</span> Received(<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>, <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">value</span>, _message);

        <span class="hljs-keyword">return</span> _x <span class="hljs-operator">+</span> <span class="hljs-number">1</span>;
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Caller</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">event</span> <span class="hljs-title">Response</span>(<span class="hljs-params"><span class="hljs-keyword">bool</span> success, <span class="hljs-keyword">bytes</span> data</span>)</span>;

    <span class="hljs-comment">// Let&#x27;s imagine that contract B does not have the source code for</span>
    <span class="hljs-comment">// contract A, but we do know the address of A and the function to call.</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testCallFoo</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> <span class="hljs-keyword">payable</span> _addr</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">payable</span></span> </span>{
        <span class="hljs-comment">// You can send ether and specify a custom gas amount</span>
        (<span class="hljs-keyword">bool</span> success, <span class="hljs-keyword">bytes</span> <span class="hljs-keyword">memory</span> data) <span class="hljs-operator">=</span> _addr.<span class="hljs-built_in">call</span>{<span class="hljs-built_in">value</span>: <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">value</span>, <span class="hljs-built_in">gas</span>: <span class="hljs-number">5000</span>}(
            <span class="hljs-built_in">abi</span>.<span class="hljs-built_in">encodeWithSignature</span>(<span class="hljs-string">"foo(string,uint256)"</span>, <span class="hljs-string">"call foo"</span>, <span class="hljs-number">123</span>)
        );

        <span class="hljs-keyword">emit</span> Response(success, data);
    }

    <span class="hljs-comment">// Calling a function that does not exist triggers the fallback function.</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testCallDoesNotExist</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> _addr</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        (<span class="hljs-keyword">bool</span> success, <span class="hljs-keyword">bytes</span> <span class="hljs-keyword">memory</span> data) <span class="hljs-operator">=</span> _addr.<span class="hljs-built_in">call</span>(
            <span class="hljs-built_in">abi</span>.<span class="hljs-built_in">encodeWithSignature</span>(<span class="hljs-string">"doesNotExist()"</span>)
        );

        <span class="hljs-keyword">emit</span> Response(success, data);
    }
}
</code></pre>
`

export default html
