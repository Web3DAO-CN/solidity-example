// metadata
export const version = "0.8.10"
export const title = "Library"
export const description =
  "Example of how to write and use libraries in your Solidity code"

const html = `<p>Libraries are similar to contracts, but you can&#39;t declare any state variable and
you can&#39;t send ether.</p>
<p>A library is embedded into the contract if all library functions are internal.</p>
<p>Otherwise the library must be deployed and then linked before the contract is deployed.</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-class"><span class="hljs-keyword">library</span> <span class="hljs-title">SafeMath</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> x, <span class="hljs-keyword">uint</span> y</span>) <span class="hljs-title"><span class="hljs-keyword">internal</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span></span>) </span>{
        <span class="hljs-keyword">uint</span> z <span class="hljs-operator">=</span> x <span class="hljs-operator">+</span> y;
        <span class="hljs-built_in">require</span>(z <span class="hljs-operator">&gt;</span><span class="hljs-operator">=</span> x, <span class="hljs-string">"uint overflow"</span>);

        <span class="hljs-keyword">return</span> z;
    }
}

<span class="hljs-class"><span class="hljs-keyword">library</span> <span class="hljs-title">Math</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sqrt</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> y</span>) <span class="hljs-title"><span class="hljs-keyword">internal</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span> z</span>) </span>{
        <span class="hljs-keyword">if</span> (y <span class="hljs-operator">&gt;</span> <span class="hljs-number">3</span>) {
            z <span class="hljs-operator">=</span> y;
            <span class="hljs-keyword">uint</span> x <span class="hljs-operator">=</span> y <span class="hljs-operator">/</span> <span class="hljs-number">2</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span>;
            <span class="hljs-keyword">while</span> (x <span class="hljs-operator">&lt;</span> z) {
                z <span class="hljs-operator">=</span> x;
                x <span class="hljs-operator">=</span> (y <span class="hljs-operator">/</span> x <span class="hljs-operator">+</span> x) <span class="hljs-operator">/</span> <span class="hljs-number">2</span>;
            }
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (y <span class="hljs-operator">!</span><span class="hljs-operator">=</span> <span class="hljs-number">0</span>) {
            z <span class="hljs-operator">=</span> <span class="hljs-number">1</span>;
        }
        <span class="hljs-comment">// else z = 0 (default value)</span>
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">TestSafeMath</span> </span>{
    <span class="hljs-keyword">using</span> <span class="hljs-title">SafeMath</span> <span class="hljs-title"><span class="hljs-keyword">for</span></span> <span class="hljs-title"><span class="hljs-keyword">uint</span></span>;

    <span class="hljs-keyword">uint</span> <span class="hljs-keyword">public</span> MAX_UINT <span class="hljs-operator">=</span> <span class="hljs-number">2</span><span class="hljs-operator">*</span><span class="hljs-operator">*</span><span class="hljs-number">256</span> <span class="hljs-operator">-</span> <span class="hljs-number">1</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAdd</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> x, <span class="hljs-keyword">uint</span> y</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span></span>) </span>{
        <span class="hljs-keyword">return</span> x.add(y);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testSquareRoot</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> x</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span></span>) </span>{
        <span class="hljs-keyword">return</span> Math.sqrt(x);
    }
}

<span class="hljs-comment">// Array function to delete element at index and re-organize the array</span>
<span class="hljs-comment">// so that their are no gaps between the elements.</span>
<span class="hljs-class"><span class="hljs-keyword">library</span> <span class="hljs-title">Array</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">storage</span> arr, <span class="hljs-keyword">uint</span> index</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-comment">// Move the last element into the place to delete</span>
        <span class="hljs-built_in">require</span>(arr.<span class="hljs-built_in">length</span> <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span>, <span class="hljs-string">"Can&#x27;t remove from empty array"</span>);
        arr[index] <span class="hljs-operator">=</span> arr[arr.<span class="hljs-built_in">length</span> <span class="hljs-operator">-</span> <span class="hljs-number">1</span>];
        arr.<span class="hljs-built_in">pop</span>();
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">TestArray</span> </span>{
    <span class="hljs-keyword">using</span> <span class="hljs-title">Array</span> <span class="hljs-title"><span class="hljs-keyword">for</span></span> <span class="hljs-title"><span class="hljs-keyword">uint</span></span>[];

    <span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">public</span> arr;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testArrayRemove</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">uint</span> i <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i <span class="hljs-operator">&lt;</span> <span class="hljs-number">3</span>; i<span class="hljs-operator">+</span><span class="hljs-operator">+</span>) {
            arr.<span class="hljs-built_in">push</span>(i);
        }

        arr.remove(<span class="hljs-number">1</span>);

        <span class="hljs-built_in">assert</span>(arr.<span class="hljs-built_in">length</span> <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">2</span>);
        <span class="hljs-built_in">assert</span>(arr[<span class="hljs-number">0</span>] <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">0</span>);
        <span class="hljs-built_in">assert</span>(arr[<span class="hljs-number">1</span>] <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">2</span>);
    }
}
</code></pre>
`

export default html
