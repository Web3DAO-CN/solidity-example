// metadata
export const version = "0.8.10"
export const title = "Deploy Any Contract"
export const description = "Deploy Any Contract"

const html = `<p>Deploy any contract by calling <code>Proxy.deploy(bytes memory _code)</code></p>
<p>For this example, you can get the contract bytecodes by calling <code>Helper.getBytecode1</code> and <code>Helper.getBytecode2</code></p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Proxy</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">event</span> <span class="hljs-title">Deploy</span>(<span class="hljs-params"><span class="hljs-keyword">address</span></span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">fallback</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">payable</span></span> </span>{}

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deploy</span>(<span class="hljs-params"><span class="hljs-keyword">bytes</span> <span class="hljs-keyword">memory</span> _code</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">payable</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">address</span> addr</span>) </span>{
        <span class="hljs-keyword">assembly</span> {
            <span class="hljs-comment">// create(v, p, n)</span>
            <span class="hljs-comment">// v = amount of ETH to send</span>
            <span class="hljs-comment">// p = pointer in memory to start of code</span>
            <span class="hljs-comment">// n = size of code</span>
            addr <span class="hljs-operator">:=</span> <span class="hljs-built_in">create</span>(<span class="hljs-built_in">callvalue</span>(), <span class="hljs-built_in">add</span>(_code, <span class="hljs-number">0x20</span>), <span class="hljs-built_in">mload</span>(_code))
        }
        <span class="hljs-comment">// return address 0 on error</span>
        <span class="hljs-built_in">require</span>(addr <span class="hljs-operator">!</span><span class="hljs-operator">=</span> <span class="hljs-keyword">address</span>(<span class="hljs-number">0</span>), <span class="hljs-string">"deploy failed"</span>);

        <span class="hljs-keyword">emit</span> Deploy(addr);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">execute</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> _target, <span class="hljs-keyword">bytes</span> <span class="hljs-keyword">memory</span> _data</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">payable</span></span> </span>{
        (<span class="hljs-keyword">bool</span> success, ) <span class="hljs-operator">=</span> _target.<span class="hljs-built_in">call</span>{<span class="hljs-built_in">value</span>: <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">value</span>}(_data);
        <span class="hljs-built_in">require</span>(success, <span class="hljs-string">"failed"</span>);
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">TestContract1</span> </span>{
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">public</span> owner <span class="hljs-operator">=</span> <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setOwner</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> _owner</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-built_in">require</span>(<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span> <span class="hljs-operator">=</span><span class="hljs-operator">=</span> owner, <span class="hljs-string">"not owner"</span>);
        owner <span class="hljs-operator">=</span> _owner;
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">TestContract2</span> </span>{
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">public</span> owner <span class="hljs-operator">=</span> <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>;
    <span class="hljs-keyword">uint</span> <span class="hljs-keyword">public</span> value <span class="hljs-operator">=</span> <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">value</span>;
    <span class="hljs-keyword">uint</span> <span class="hljs-keyword">public</span> x;
    <span class="hljs-keyword">uint</span> <span class="hljs-keyword">public</span> y;

    <span class="hljs-function"><span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _x, <span class="hljs-keyword">uint</span> _y</span>) <span class="hljs-title"><span class="hljs-keyword">payable</span></span> </span>{
        x <span class="hljs-operator">=</span> _x;
        y <span class="hljs-operator">=</span> _y;
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Helper</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getBytecode1</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bytes</span> <span class="hljs-keyword">memory</span></span>) </span>{
        <span class="hljs-keyword">bytes</span> <span class="hljs-keyword">memory</span> bytecode <span class="hljs-operator">=</span> <span class="hljs-keyword">type</span>(TestContract1).<span class="hljs-built_in">creationCode</span>;
        <span class="hljs-keyword">return</span> bytecode;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getBytecode2</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _x, <span class="hljs-keyword">uint</span> _y</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bytes</span> <span class="hljs-keyword">memory</span></span>) </span>{
        <span class="hljs-keyword">bytes</span> <span class="hljs-keyword">memory</span> bytecode <span class="hljs-operator">=</span> <span class="hljs-keyword">type</span>(TestContract2).<span class="hljs-built_in">creationCode</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">abi</span>.<span class="hljs-built_in">encodePacked</span>(bytecode, <span class="hljs-built_in">abi</span>.<span class="hljs-built_in">encode</span>(_x, _y));
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCalldata</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> _owner</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bytes</span> <span class="hljs-keyword">memory</span></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">abi</span>.<span class="hljs-built_in">encodeWithSignature</span>(<span class="hljs-string">"setOwner(address)"</span>, _owner);
    }
}
</code></pre>
`

export default html
