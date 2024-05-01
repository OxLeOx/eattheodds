/*
Crafted with love by
Fueled on Bacon
https://fueledonbacon.com
*/
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SaleWindow is Ownable {
    
    uint256 public startSaleTime;
    uint256 public endSaleTime;
    bool public salePeriodOverride;

    constructor(
        uint256 _startSaleTime,
        uint256 _endSaleTime
    ) {
        startSaleTime = _startSaleTime;
        endSaleTime = _endSaleTime;
    }

    function setStartTime(uint startTime) external onlyOwner {
       startSaleTime = startTime;
    }

    function setEndTime(uint endTime) external onlyOwner {
        require(endTime > startSaleTime, "END_LESS_THAN_START");
        endSaleTime = endTime;
    }

    function toggleSalePeriodOverride() external onlyOwner {
        salePeriodOverride = !salePeriodOverride;
    }

    function saleIsActive() public view returns (bool) {
        if(salePeriodOverride) {
            return true;
        }
        return block.timestamp >= startSaleTime && block.timestamp <= endSaleTime;
    }
}
