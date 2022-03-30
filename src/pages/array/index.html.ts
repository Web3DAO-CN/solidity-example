// metadata
export const version = "0.8.10"
export const title = "Array"
export const description = "Learn about arrays in Solidity"

const html = `<p>Array can have a compile-time fixed size or a dynamic size.</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Array</span> </span>{
    <span class="hljs-comment">// Several ways to initialize an array</span>
    <span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">public</span> arr;
    <span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">public</span> arr2 <span class="hljs-operator">=</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
    <span class="hljs-comment">// Fixed sized array, all elements initialize to 0</span>
    <span class="hljs-keyword">uint</span>[<span class="hljs-number">10</span>] <span class="hljs-keyword">public</span> myFixedSizeArr;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> i</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span></span>) </span>{
        <span class="hljs-keyword">return</span> arr[i];
    }

    <span class="hljs-comment">// Solidity can return the entire array.</span>
    <span class="hljs-comment">// But this function should be avoided for</span>
    <span class="hljs-comment">// arrays that can grow indefinitely in length.</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getArr</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">memory</span></span>) </span>{
        <span class="hljs-keyword">return</span> arr;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">push</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> i</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-comment">// Append to array</span>
        <span class="hljs-comment">// This will increase the array length by 1.</span>
        arr.<span class="hljs-built_in">push</span>(i);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pop</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-comment">// Remove last element from array</span>
        <span class="hljs-comment">// This will decrease the array length by 1</span>
        arr.<span class="hljs-built_in">pop</span>();
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getLength</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span></span>) </span>{
        <span class="hljs-keyword">return</span> arr.<span class="hljs-built_in">length</span>;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> index</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-comment">// Delete does not change the array length.</span>
        <span class="hljs-comment">// It resets the value at index to it&#x27;s default value,</span>
        <span class="hljs-comment">// in this case 0</span>
        <span class="hljs-keyword">delete</span> arr[index];
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">examples</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> </span>{
        <span class="hljs-comment">// create array in memory, only fixed size can be created</span>
        <span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">memory</span> a <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-keyword">uint</span>[](<span class="hljs-number">5</span>);
    }
}
</code></pre>
<h3 id="examples-of-removing-array-element">Examples of removing array element</h3>
<p>Remove array element by shifting elements from right to left</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">ArrayRemoveByShifting</span> </span>{
    <span class="hljs-comment">// [1, 2, 3] -- remove(1) --&gt; [1, 3, 3] --&gt; [1, 3]</span>
    <span class="hljs-comment">// [1, 2, 3, 4, 5, 6] -- remove(2) --&gt; [1, 2, 4, 5, 6, 6] --&gt; [1, 2, 4, 5, 6]</span>
    <span class="hljs-comment">// [1, 2, 3, 4, 5, 6] -- remove(0) --&gt; [2, 3, 4, 5, 6, 6] --&gt; [2, 3, 4, 5, 6]</span>
    <span class="hljs-comment">// [1] -- remove(0) --&gt; [1] --&gt; []</span>

    <span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">public</span> arr;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _index</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-built_in">require</span>(_index <span class="hljs-operator">&lt;</span> arr.<span class="hljs-built_in">length</span>, <span class="hljs-string">"index out of bound"</span>);

        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">uint</span> i <span class="hljs-operator">=</span> _index; i <span class="hljs-operator">&lt;</span> arr.<span class="hljs-built_in">length</span> <span class="hljs-operator">-</span> <span class="hljs-number">1</span>; i<span class="hljs-operator">+</span><span class="hljs-operator">+</span>) {
            arr[i] <span class="hljs-operator">=</span> arr[i <span class="hljs-operator">+</span> <span class="hljs-number">1</span>];
        }
        arr.<span class="hljs-built_in">pop</span>();
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> </span>{
        arr <span class="hljs-operator">=</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
        remove(<span class="hljs-number">2</span>);
        <span class="hljs-comment">// [1, 2, 4, 5]</span>
        <span class="hljs-built_in">assert</span>(arr[<span class="hljs-number">0</span>] <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">1</span>);
        <span class="hljs-built_in">assert</span>(arr[<span class="hljs-number">1</span>] <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">2</span>);
        <span class="hljs-built_in">assert</span>(arr[<span class="hljs-number">2</span>] <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">4</span>);
        <span class="hljs-built_in">assert</span>(arr[<span class="hljs-number">3</span>] <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">5</span>);
        <span class="hljs-built_in">assert</span>(arr.<span class="hljs-built_in">length</span> <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">4</span>);

        arr <span class="hljs-operator">=</span> [<span class="hljs-number">1</span>];
        remove(<span class="hljs-number">0</span>);
        <span class="hljs-comment">// []</span>
        <span class="hljs-built_in">assert</span>(arr.<span class="hljs-built_in">length</span> <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">0</span>);
    }
}
</code></pre>
<p>Remove array element by copying last element into to the place to remove</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">ArrayReplaceFromEnd</span> </span>{
    <span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">public</span> arr;

    <span class="hljs-comment">// Deleting an element creates a gap in the array.</span>
    <span class="hljs-comment">// One trick to keep the array compact is to</span>
    <span class="hljs-comment">// move the last element into the place to delete.</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> index</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-comment">// Move the last element into the place to delete</span>
        arr[index] <span class="hljs-operator">=</span> arr[arr.<span class="hljs-built_in">length</span> <span class="hljs-operator">-</span> <span class="hljs-number">1</span>];
        <span class="hljs-comment">// Remove the last element</span>
        arr.<span class="hljs-built_in">pop</span>();
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        arr <span class="hljs-operator">=</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];

        remove(<span class="hljs-number">1</span>);
        <span class="hljs-comment">// [1, 4, 3]</span>
        <span class="hljs-built_in">assert</span>(arr.<span class="hljs-built_in">length</span> <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">3</span>);
        <span class="hljs-built_in">assert</span>(arr[<span class="hljs-number">0</span>] <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">1</span>);
        <span class="hljs-built_in">assert</span>(arr[<span class="hljs-number">1</span>] <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">4</span>);
        <span class="hljs-built_in">assert</span>(arr[<span class="hljs-number">2</span>] <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">3</span>);

        remove(<span class="hljs-number">2</span>);
        <span class="hljs-comment">// [1, 4]</span>
        <span class="hljs-built_in">assert</span>(arr.<span class="hljs-built_in">length</span> <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">2</span>);
        <span class="hljs-built_in">assert</span>(arr[<span class="hljs-number">0</span>] <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">1</span>);
        <span class="hljs-built_in">assert</span>(arr[<span class="hljs-number">1</span>] <span class="hljs-operator">=</span><span class="hljs-operator">=</span> <span class="hljs-number">4</span>);
    }
}
</code></pre>
`

export default html
