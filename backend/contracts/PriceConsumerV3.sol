// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    mapping(string => AggregatorV3Interface) priceFeeds;

    constructor() {
        priceFeeds["BTC/USD"] = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
        priceFeeds["ETH/USD"] = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        priceFeeds["LINK/USD"] = AggregatorV3Interface(0xc59E3633BAAC79493d908e63626716e204A45EdF);
        priceFeeds["BTC/ETH"] = AggregatorV3Interface(0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22);
    }

    function getLatestPrice(string memory pair) public view returns (int) {
        AggregatorV3Interface priceFeed = priceFeeds[pair];
        (,int price,,,) = priceFeed.latestRoundData();
        return price;
    }
}
