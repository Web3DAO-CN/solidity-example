// metadata
export const version = "0.8.10"
export const title = "Visibility"
export const description =
  "An example of external, internal, private and public functions in Solidity"

const html = `<p>Functions and state variables have to declare whether they are accessible by other contracts.</p>
<p>Functions can be declared as</p>
<ul>
<li><code>public</code> - any contract and account can call</li>
<li><code>private</code> - only inside the contract that defines the function</li>
<li><code>internal</code>- only inside contract that inherits an <code>internal</code> function</li>
<li><code>external</code> - only other contracts and accounts can call</li>
</ul>
<p>State variables can be declared as <code>public</code>, <code>private</code>, or <code>internal</code> but not <code>external</code>.</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Base</span> </span>{
    <span class="hljs-comment">// Private function can only be called</span>
    <span class="hljs-comment">// - inside this contract</span>
    <span class="hljs-comment">// Contracts that inherit this contract cannot call this function.</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">privateFunc</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">private</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">"private function called"</span>;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testPrivateFunc</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span></span>) </span>{
        <span class="hljs-keyword">return</span> privateFunc();
    }

    <span class="hljs-comment">// Internal function can be called</span>
    <span class="hljs-comment">// - inside this contract</span>
    <span class="hljs-comment">// - inside contracts that inherit this contract</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">internalFunc</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">internal</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">"internal function called"</span>;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testInternalFunc</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">virtual</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span></span>) </span>{
        <span class="hljs-keyword">return</span> internalFunc();
    }

    <span class="hljs-comment">// Public functions can be called</span>
    <span class="hljs-comment">// - inside this contract</span>
    <span class="hljs-comment">// - inside contracts that inherit this contract</span>
    <span class="hljs-comment">// - by other contracts and accounts</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">publicFunc</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">"public function called"</span>;
    }

    <span class="hljs-comment">// External functions can only be called</span>
    <span class="hljs-comment">// - by other contracts and accounts</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">externalFunc</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">"external function called"</span>;
    }

    <span class="hljs-comment">// This function will not compile since we&#x27;re trying to call</span>
    <span class="hljs-comment">// an external function here.</span>
    <span class="hljs-comment">// function testExternalFunc() public pure returns (string memory) {</span>
    <span class="hljs-comment">//     return externalFunc();</span>
    <span class="hljs-comment">// }</span>

    <span class="hljs-comment">// State variables</span>
    <span class="hljs-keyword">string</span> <span class="hljs-keyword">private</span> privateVar <span class="hljs-operator">=</span> <span class="hljs-string">"my private variable"</span>;
    <span class="hljs-keyword">string</span> <span class="hljs-keyword">internal</span> internalVar <span class="hljs-operator">=</span> <span class="hljs-string">"my internal variable"</span>;
    <span class="hljs-keyword">string</span> <span class="hljs-keyword">public</span> publicVar <span class="hljs-operator">=</span> <span class="hljs-string">"my public variable"</span>;
    <span class="hljs-comment">// State variables cannot be external so this code won&#x27;t compile.</span>
    <span class="hljs-comment">// string external externalVar = "my external variable";</span>
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">is</span> <span class="hljs-title">Base</span> </span>{
    <span class="hljs-comment">// Inherited contracts do not have access to private functions</span>
    <span class="hljs-comment">// and state variables.</span>
    <span class="hljs-comment">// function testPrivateFunc() public pure returns (string memory) {</span>
    <span class="hljs-comment">//     return privateFunc();</span>
    <span class="hljs-comment">// }</span>

    <span class="hljs-comment">// Internal function call be called inside child contracts.</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testInternalFunc</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">override</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span></span>) </span>{
        <span class="hljs-keyword">return</span> internalFunc();
    }
}
</code></pre>
`

export default html
