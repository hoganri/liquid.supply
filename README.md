# liquid.supply

OTC Marketplace for Liquid Network Atomic Swap Proposals

Read more about the Blockstream Liquid Swap Tool: https://github.com/Blockstream/liquid-swap/

### Getting started

This site runs on Python 3.5+ (I'm running 3.7.1), Flask, MySQL, PyMySQL, and Flask-SSLify

You can create a new database named "liquid_swaps" and then run the schema.sql file to create the tables required for the app to run

### API

If you want to build your own program with liquid.supply, you can use the API. Data is delivered in JSON format.


#### Swap feed

Get a list of all swaps

```
https://liquid.supply/swap-feed
```

#### View a proposal

Get data for a specific proposal, where "proposal_id" is the proposal ID 

```
https://liquid.supply/proposal-data/proposal_id
```

#### View acceptance receipts for a proposal

Retreive acceptance receipts for a specific proposal, where "proposal_id" is the proposal ID

```
https://liquid.supply/accept-data/proposal_id
```

#### Submit a proposal

Submit a new proposal. Body data required, change the =variable to your data being submitted

baseCur = Base currency
baseAmt = Amount of base currency  
countCur = Counter currency  
countAmt = Amount of counter currency  
proposal = Liquid swap proposal  
pgp = Your public PGP key



```
https://liquid.supply/new-swap?baseCur=baseCur&baseAmt=baseAmt&countCur=countCur&countAmt=countAmt&proposal=proposal&pgp=swapPgp
```

#### Submit an acceptance receipt

Submit an acceptance receipt for a specific proposal. Change "proposalID" to the proposal ID, and "acceptance" to the encrypted swap acceptance receipt

```
https://liquid.supply/accept?swap_id=proposalId&accepted=acceptance
```