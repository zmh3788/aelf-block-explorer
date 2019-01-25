/**
 * @file getContractAddress.js
 * @author zhouminghui
 * 获取查询使用的公共钱包与合约地址
*/

import {aelf} from '../utils';
import * as Aelf from 'aelf-sdk';
import {commonPrivateKey} from '../../config/config';
export default function getContractAddress() {
    return new Promise((resolve, reject) => {
        aelf.chain.connectChain((error, result) => {
            const CONSENSUSADDRESS = result.result['AElf.Contracts.Consensus'];
            const DIVIDENDSADDRESS = result.result['AElf.Contracts.Dividends'];
            const TOKENADDRESS = result.result['AElf.Contracts.Token'];
            const wallet = Aelf.wallet.getWalletByPrivateKey(commonPrivateKey);
            let contractFn = {};
            const consensus = new Promise((resolve, reject) => {
                const consensus = aelf.chain.contractAt(CONSENSUSADDRESS, wallet);
                contractFn.consensus = consensus;
            });

            const dividends = new Promise((resolve, reject) => {
                const dividends = aelf.chain.contractAt(DIVIDENDSADDRESS, wallet);
                contractFn.dividends = dividends;
            });

            const tokenContract = new Promise((resolve, reject) => {
                const tokenContract = aelf.chain.contractAt(TOKENADDRESS, wallet);
                contractFn.tokenContract = tokenContract;
            });

            consensus.then(dividends).then(tokenContract);
            const output = {
                CONSENSUSADDRESS,
                DIVIDENDSADDRESS,
                TOKENADDRESS,
                wallet,
                consensus: contractFn.consensus,
                dividends: contractFn.dividends,
                tokenContract: contractFn.tokenContract
            };
            resolve(output);
        });
    });
}