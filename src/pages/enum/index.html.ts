// metadata
export const version = "0.8.10"
export const title = "Enum"
export const description = "Example of enums in Solidity"

const html = `<p>Solidity supports enumerables and they are useful to model choice and keep track of state.</p>
<p>Enums can be declared outside of a contract.</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Enum</span> </span>{
    <span class="hljs-comment">// Enum representing shipping status</span>
    <span class="hljs-keyword">enum</span> <span class="hljs-title">Status</span> {
        Pending,
        Shipped,
        Accepted,
        Rejected,
        Canceled
    }

    <span class="hljs-comment">// Default value is the first element listed in</span>
    <span class="hljs-comment">// definition of the type, in this case "Pending"</span>
    Status <span class="hljs-keyword">public</span> status;

    <span class="hljs-comment">// Returns uint</span>
    <span class="hljs-comment">// Pending  - 0</span>
    <span class="hljs-comment">// Shipped  - 1</span>
    <span class="hljs-comment">// Accepted - 2</span>
    <span class="hljs-comment">// Rejected - 3</span>
    <span class="hljs-comment">// Canceled - 4</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params">Status</span>) </span>{
        <span class="hljs-keyword">return</span> status;
    }

    <span class="hljs-comment">// Update status by passing uint into input</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">set</span>(<span class="hljs-params">Status _status</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        status <span class="hljs-operator">=</span> _status;
    }

    <span class="hljs-comment">// You can update to a specific enum like this</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cancel</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        status <span class="hljs-operator">=</span> Status.Canceled;
    }

    <span class="hljs-comment">// delete resets the enum to its first value, 0</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reset</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-keyword">delete</span> status;
    }
}
</code></pre>
<h3 id="declaring-and-importing-enum">Declaring and importing Enum</h3>
<p>File that the enum is declared in</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>
<span class="hljs-comment">// This is saved &#x27;EnumDeclaration.sol&#x27;</span>

<span class="hljs-keyword">enum</span> <span class="hljs-title">Status</span> {
    Pending,
    Shipped,
    Accepted,
    Rejected,
    Canceled
}
</code></pre>
<p>File that imports the enum above</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">"./EnumDeclaration.sol"</span>;

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Enum</span> </span>{
    Status <span class="hljs-keyword">public</span> status;
}
</code></pre>
`

export default html
