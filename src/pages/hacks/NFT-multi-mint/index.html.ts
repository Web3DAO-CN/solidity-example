// metadata
export const version = "0.8.10"
export const title = "科学家NFT批量抢购"
export const description = "通过工厂合约部署抢购合约批量铸造nft突破限制"

const html = `
<pre><code class="language-solidity"><span>// SPDX-License-Identifier: MIT</span>
<span>pragma</span><span> </span><span>solidity</span><span> ^0.8.1;</span>
<br />
<span>// 接口合约</span>
<span>interface</span><span> </span><span>IERC721</span><span> {</span>
<span> </span><span>// 总量</span>
<span> </span><span>function</span><span> </span><span>totalSupply</span><span>() </span><span>external</span><span> </span><span>view</span><span> </span><span>returns</span><span> (</span><span>uint</span><span>);</span>
<br />
<span> </span><span>// 铸造方法</span>
<span> </span><span>function</span><span> </span><span>mint</span><span>(</span><span>uint</span><span> amount) </span><span>external</span><span> </span><span>payable</span><span>;</span>
<br />
<span> </span><span>// 发送方法</span>
<span> </span><span>function</span><span> </span><span>transferFrom</span><span>(</span>
<span></span><span>&nbsp; &nbsp; address</span><span> from,</span>
<span></span><span>&nbsp; &nbsp; address</span><span> to,</span>
<span></span><span>&nbsp; &nbsp; uint</span><span> tokenId</span>
<span>&nbsp; &nbsp; ) </span><span>external</span><span>;</span>
<span>}</span>
<br />
<span>// 铸造合约</span>
<span>contract</span><span> </span><span>ERC721Mint</span><span> {</span>
<span></span><span>&nbsp; &nbsp; // 构造函数(nft合约地址, 归集地址)</span>
<span> &nbsp; &nbsp; </span><span>constructor</span><span>(</span><span>address</span><span> </span><span>ERC721</span><span>, </span><span>address</span><span> owner) </span><span>payable</span><span> {</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp; </span><span>// 获取总量</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp; </span><span>uint</span><span> t = </span><span>IERC721</span><span>(</span><span>ERC721</span><span>).totalSupply();</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp; </span><span>// 铸造(0.05购买总价)(5购买数量)</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp; </span><span>IERC721</span><span>(</span><span>ERC721</span><span>).mint{value: </span><span>0</span><span>.</span><span>05</span><span> </span><span>ether</span><span>}(</span><span>5</span><span>);</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp; </span><span>// 归集</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp; </span><span>for</span><span> (</span><span>uint</span><span> i = </span><span>1</span><span>; i &lt;= </span><span>5</span><span>; i++) {</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; </span><span>// 发送操作,(当前合约地址,归集地址,tokenId)</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; </span><span>IERC721</span><span>(</span><span>ERC721</span><span>).</span><span>transferFrom</span><span>(</span><span>address</span><span>(</span><span>this</span><span>), owner, t + i);</span>
<span> &nbsp; &nbsp; }</span>
<span> &nbsp; &nbsp; </span><span>// 自毁(收款地址,归集地址)</span>
<span> &nbsp; &nbsp; </span><span>selfdestruct</span><span>(</span><span>payable</span><span>(owner));</span>
<span> &nbsp; &nbsp; }</span>
<span>}</span>
<br />
<span>// 工厂合约</span>
<span>contract</span><span> </span><span>MintFactory</span><span> {</span>
<span> &nbsp; &nbsp; </span><span>// 所有者地址</span>
<span> &nbsp; &nbsp; </span><span>address</span><span> owner;</span>
<br />
<span> &nbsp; &nbsp; </span><span>constructor</span><span>() {</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp; </span><span>// 所有者 = 合约部署者</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp; owner = </span><span>msg.sender</span><span>;</span>
<span> &nbsp; &nbsp; }</span>
<br />
<span> &nbsp; &nbsp; </span><span>// 部署方法,(NFT合约地址,抢购数量)</span>
<span> &nbsp; &nbsp; </span><span>function</span><span> </span><span>deploy</span><span>(</span><span>address</span><span> </span><span>ERC721</span><span>, </span><span>uint</span><span> count) </span><span>public</span><span> </span><span>payable</span><span> {</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp; </span><span>// 用抢购数量进行循环</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp; </span><span>for</span><span> (</span><span>uint</span><span> i; i &lt; count; i++) {</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; </span><span>// 部署合约(抢购总价)(NFT合约地址,所有者地址)</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; </span><span>new</span><span> ERC721Mint{value: </span><span>0</span><span>.</span><span>05</span><span> </span><span>ether</span><span>}(</span><span>ERC721</span><span>, owner);</span>
<span> &nbsp; &nbsp;&nbsp; &nbsp; }</span>
<span> &nbsp; &nbsp; }</span>
<span>}</span></code></pre>
`

export default html
