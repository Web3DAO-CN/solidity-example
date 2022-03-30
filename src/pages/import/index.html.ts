// metadata
export const version = "0.8.10"
export const title = "Import"
export const description = "Learn how to import other Solidity files"

const html = `<p>You can import local and external files in Solidity.</p>
<h3 id="local">Local</h3>
<p>Here is our folder structure.</p>
<pre><code>├── Import.sol
└── Foo.sol
</code></pre>
<p>Foo.sol</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-keyword">struct</span> <span class="hljs-title">Point</span> {
    <span class="hljs-keyword">uint</span> x;
    <span class="hljs-keyword">uint</span> y;
}

<span class="hljs-function"><span class="hljs-keyword">error</span> <span class="hljs-title">Unauthorized</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> caller</span>)</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> x, <span class="hljs-keyword">uint</span> y</span>) <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span></span>) </span>{
    <span class="hljs-keyword">return</span> x <span class="hljs-operator">+</span> y;
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Foo</span> </span>{
    <span class="hljs-keyword">string</span> <span class="hljs-keyword">public</span> name <span class="hljs-operator">=</span> <span class="hljs-string">"Foo"</span>;
}
</code></pre>
<p>Import.sol</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-comment">// import Foo.sol from current directory</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">"./Foo.sol"</span>;

<span class="hljs-comment">// import {symbol1 as alias, symbol2} from "filename";</span>
<span class="hljs-keyword">import</span> {<span class="hljs-title">Unauthorized</span>, <span class="hljs-title">add</span> <span class="hljs-title"><span class="hljs-keyword">as</span></span> <span class="hljs-title">func</span>, <span class="hljs-title">Point</span>} <span class="hljs-title"><span class="hljs-keyword">from</span></span> <span class="hljs-string">"./Foo.sol"</span>;

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Import</span> </span>{
    <span class="hljs-comment">// Initialize Foo.sol</span>
    Foo <span class="hljs-keyword">public</span> foo <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> Foo();

    <span class="hljs-comment">// Test Foo.sol by getting it&#x27;s name.</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFooName</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">string</span> <span class="hljs-keyword">memory</span></span>) </span>{
        <span class="hljs-keyword">return</span> foo.<span class="hljs-built_in">name</span>();
    }
}
</code></pre>
<h3 id="external">External</h3>
<p>You can also import from <a href="https://github.com">GitHub</a> by simply copying the url</p>
<pre><code class="language-solidity"><span class="hljs-comment">// https://github.com/owner/repo/blob/branch/path/to/Contract.sol</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">"https://github.com/owner/repo/blob/branch/path/to/Contract.sol"</span>;

<span class="hljs-comment">// Example import ECDSA.sol from openzeppelin-contract repo, release-v4.5 branch</span>
<span class="hljs-comment">// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/utils/cryptography/ECDSA.sol</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">"https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/utils/cryptography/ECDSA.sol"</span>;
</code></pre>
`

export default html
