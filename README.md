[![wakatime](https://wakatime.com/badge/user/30595099-02b3-44c9-9553-bfedf73678b0/project/20684b43-07ed-4fdb-9303-f240dac2202f.svg?style=for-the-badge)](https://wakatime.com/badge/user/30595099-02b3-44c9-9553-bfedf73678b0/project/20684b43-07ed-4fdb-9303-f240dac2202f)

# **I. Introduction**

## **1. Overview**

### **1.1. Description**

#### _- This is a large-scale project for DEVERA course, a huge marketplace with a comprehensive full range of features, an individual work by only me with 200-hour coding._

#### _- Supported by new-blockchain-platform **ICON** as backend, this full-stack decentralized application has an incredibly fast transaction speed._

### **1.2. Built with**

#### _**- `ReactJS`**_

#### _**- `TailwindCSS`**_

#### _**- `ICON JavaScript SDK`**_

#### _**- `Goloop CLI`**_

#### _**- `JSON-RPC`**_

#### _**- ...etc**_

### **1.3 Website URL**

    https://SnowyField1906.github.io/NFTee

### **1.4 Requirements**

#### _**- ICONex wallet**_

    https://chrome.google.com/webstore/detail/iconex/flpiciilemghbmfalicajoolhkkenfel

#### _**- Testnet ICX on Sejong network**_

    https://faucet.iconosphere.io/

#### _**- Recommend using Linux for better experience**_

### **1.5 Last update**

#### _**- November 1<sup>st</sup>, 2022**_

### **1.6 Upcoming features**

#### _**- A separated currency for special privileges**_

#### _**- Vouchers**_

#### _**- Promotions**_

#### _**- Membership cards**_

#### _**- A huge social network system**_

<br/>

## **2. NFTee Introduction**

### **- Combinated from NFT and ICONee, this web application is a platform for trading a special type of token.**

- _Unlike **NFT** - **ICR3**, which can be minted into multiple copies, this token represents something particularly unique in the world (such as artworks, limited items, or even houses, etc.)_.
- _The price can never be changed except for deletion or **Auction**._

### **- Due to have high competitiveness, this token is also purchased in a special way.**

- _It is impossible to purchase any **NFT** right away but through **Send Request** method. Once the first **Request** is sent, there will be a 24-hour countdown to wait for the second **Request**._
- _Unless there is the second **Request**, after 24 hours, that **NFT** will automatically belongs to that single **Request**._
- _Otherwise, an **Auction** will be opened automatically after 24 hours with the same amount of time for its duration since the first **Request**. But the owner can still custom its duration, limit bid and start in pending period. Once started, the first **Request** becomes the first **Bidder** immediately. The final **Bidder** will be the owner._

### **- Have highly competitive and valuable as it relies on copyright and scarcity.**

- _The new owner will have fully access to that **NFT**, in contrary, the old owner will lose all control and can only own it through an acquisition._

### **- Everything is all automatic.**

- _The **Smart Contracts** were written in a special way to keep everything launching in automaticity._

<br/>

## **3. Common Issues**

### **- It's easy to get free ICX for experiencing the service.**

- _This web application was launched on **Sejong testnet**, where you can pay everything for free. In order to do it, remember to using **ICX faucets** before using._

### **- Be careful to use copyrighted picures for testing without permissions.**

- _This web application will not have any relevance to the cases of users infringing copyright._

### **- The contents might be oversized.**

- _When coding this web application, I used an operating system that everything is shrunk. I was startle when opening it on other devices. I sincerely apologize for this unfortunate accident._

### **- The code is a bit messy and the performance is stil not good.**

- _I did this project in a rush, that's why everything is still not good and the source code looks a bit messy._
- _Besides, there are still some essential features missing and a lot of things unfinished, it will be perfected someday in the future._

<br/>

# **II. Information**

## **1. Backend (ICON Blockchain)**

### **1.1. Network - NID**

    Sejong testnet - 0x53

### **1.2. Contract address**

    cxe9f245feb01cf439901ed3eef9e307f76653e198

### **1.3. Tracker URL (requires a recent transaction to make it works back)**

    https://sejong.tracker.solidwallet.io/contracttx/cxe9f245feb01cf439901ed3eef9e307f76653e198

### **1.4. Variables**

<table>
    <tr align="center">
        <td><b>Types</b></td>
        <td><b>Names</b></td>
        <td><b>Properties</b></td>
    </tr>
    <tr align="center">
        <td><b>Global</b></td>
        <td>users</td>
        <td>ArrayList&lt;Address&gt;</td>
    </tr>
   <tr align="center">
        <td rowspan=5><b>Mapping</b></td>
        <td>userMapCollections</td>
        <td>HashMap&lt;Address, ArrayList&lt;String&gt;&gt;</td>
    </tr>
   <tr align="center">
        <td>collectionMapNFTs</td>
        <td>HashMap&lt;String, ArrayList&lt;String&gt;&gt;</td>
    </tr>
       <tr align="center">
        <td>nftMapRequests</td>
        <td>HashMap&lt;String, ArrayList&lt;Address&gt;&gt;</td>
    </tr>
       <tr align="center">
        <td>nftMapOwners</td>
        <td>HashMap&lt;String, HashMap&lt;Address, BigInteger&gt;&gt;</td>
    </tr>
       <tr align="center">
        <td>nftMapNotifications</td>
        <td>HashMap&lt;String, ArrayList&lt;String&gt;&gt;</td>
    </tr>
    <tr align="center">
        <td rowspan=3><b>Information</b></td>
        <td>collectionInfo</td>
        <td>HashMap&lt;String, <b>Collection</b>&gt;</td>
    </tr>
    <tr align="center">
        <td>nftInfo</td>
        <td>HashMap&lt;String, <b>NFT</b>&gt;</td>
    </tr>
    <tr align="center">
        <td>notificationInfo</td>
        <td>HashMap&lt;String, <b>Notification</b>&gt;</td>
    </tr>
</table>

### **1.5. Methods**

<table>
    <tr align="center">
        <td rowspan=2><b>Types</b></td>
        <td colspan=4><b>Methods</b></td>
    </tr>
    <tr align="center">
        <td colspan=2><b>CALL</b></td>
        <td colspan=2><b>SEND</b></td>
    </tr>
    <tr align="center">
        <td rowspan=2><b>Global</b></td>
        <td>getUsers</td>
        <td>getPublicNotifications</td>
        <td rowspan=2 colspan=2>\</td>
    </tr>
    <tr align="center">
        <td>getPublicCollections</td>
        <td>getPublicNFTs</td>
    </tr>
    <tr align="center">
        <td rowspan=3><b>User</b></td>
        <td>getUserAuctions</td>
        <td>getUserNotifications</td>
        <td rowspan=3 colspan=2>\</td>
    </tr>
    <tr align="center">
        <td>getUserCollections</td>
        <td>getUserCustomCollections</td>
    </tr>
    <tr align="center">
        <td colspan=2>getUserPublicCustomCollections</td>
    </tr>
    <tr align="center">
        <td rowspan=2><b>Collection</b></td>
        <td rowspan=2>getCollectionNFTs</td>
        <td rowspan=2>getCollectionPublicNFTs</td>
        <td>createCollection</td>
        <td>editCollection</td>
    </tr>
    <tr align="center">
        <td colspan=2>deleteCollection</td>
    </tr>
    <tr align="center">
        <td rowspan=3><b>NFT</b></td>
        <td>getNFTOwners</td>
        <td>getNFTCurrentOwner</td>
        <td>createNFT</td>
        <td>editNFT</td>
    </tr>
    <tr align="center">
        <td>getNFTRequests</td>
        <td>getFirstRequest</td>
        <td>addNFT</td>
        <td>addToCart</td>
    </tr>
    <tr align="center">
        <td>getNFTNotifications</td>
        <td>getNFTPurchaseTimes</td>
        <td>removeNFT</td>
        <td>deleteNFT</td>
    </tr>
    <tr align="center">
        <td rowspan=2><b>Information</b></td>
        <td>getCollectionInfo</td>
        <td>getNFTInfo</td>
        <td rowspan=2 colspan=2>\</td>
    </tr>
    <tr align="center">
        <td>getNotificationInfo</td>
        <td>onSale</td>
    </tr>
    <tr align="center">
        <td><b>Contract</b></td>
        <td>balance</td>
        <td>value</td>
        <td colspan=2>\<td>
    </tr>
    <tr align="center">
        <td rowspan=2><b>Auction</b></td>
        <td rowspan=2 colspan=2>auctionStatus</td>
        <td>sendRequest</td>
        <td>sendBid</td>
    </tr>
    <tr align="center">
        <td colspan=2>startAuction</td>
    </tr>
    <tr align="center">
        <td rowspan=1><b>Addition</b></td>
        <td>sortedCollections</td>
        <td>sortedNFTs</td>
        <td colspan=2>\<td>
    </tr>
</table>

<br/>

## **2. Frontend**

### **2.1. Pages**

<table>
    <tr align="center">
        <td><b>Types</b></td>
        <td><b>Names</b></td>
        <td><b>Routes</b></td>
    </tr>
    <tr align="center">
        <td rowspan=5><b>Main pages</b></td>
        <td>Welcome</td>
        <td>/NFTee</td>
    </tr>
    <tr align="center">
        <td>Home</td>
        <td>/NFTee/h</td>
    </tr>
    <tr align="center">
        <td>Explore</td>
        <td>/NFTee/e</td>
    </tr>
    <tr align="center">
        <td>Galleries</td>
        <td>/NFTee/g</td>
    </tr>
        <tr align="center">
        <td>About</td>
        <td>/NFTee/a</td>
    </tr>
    <tr align="center">
        <td rowspan=3><b>Sub pages</b></td>
        <td>Create</td>
        <td>/NFTee/c</td>
    </tr>
    <tr align="center">
        <td>Profile</td>
        <td>/NFTee/p</td>
    </tr>
    <tr align="center">
        <td>Logs</td>
        <td>/NFTee/l</td>
    </tr>
    <tr align="center">
        <td rowspan=2><b>External pages</b></td>
        <td>External Profile</td>
        <td>/NFTee/p/<code>address</code></td>
    </tr>
    <tr align="center">
        <td>External Collection</td>
        <td>/NFTee/p/<code>address</code>/<code>collection-name</code></td>
    </tr>
</table>

### **2.2. Containers**

<table>
    <tr align="center">
        <td><b>Types</b></td>
        <td><b>Names</b></td>
    </tr>
    <tr align="center">
        <td rowspan=3><b>Shortcuts</b></td>
        <td>Collections</td>
    </tr>
    <tr align="center">
        <td>Cart</td>
    </tr>
    <tr align="center">
        <td>Notification</td>
    </tr>
    <tr align="center">
        <td rowspan=2><b>Navigators</b></td>
        <td>Header</td>
    </tr>
    <tr align="center">
        <td>Footer</td>
    </tr>
    <tr align="center">
        <td rowspan=11><b>Components</b></td>
        <td>Collection Card</td>
    </tr>
    <tr align="center">
        <td>Small Collection</td>
    </tr>
    <tr align="center">
        <td>Big Collection</td>
    </tr>
    <tr align="center">
        <td>Edit Collection</td>
    </tr>
    <tr align="center">
        <td>Create Collection</td>
    </tr>
    <tr align="center">
        <td>Collection List</td>
    </tr>
    <tr align="center">
        <td>NFT Card</td>
    </tr>
    <tr align="center">
        <td>Small NFT</td>
    </tr>
    <tr align="center">
        <td>Big NFT</td>
    </tr>
    <tr align="center">
        <td>Edit NFT</td>
    </tr>
    <tr align="center">
        <td>Auction Modal</td>
    </tr>
</table>
