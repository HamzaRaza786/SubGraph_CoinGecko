import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Dai, Approval, Transfer } from "../generated/Dai/Dai"
import { Token, DayValuation} from "../generated/schema"

export function handleApproval(event: Approval): void {
  // // Entities can be loaded from the store using a string ID; this ID
  // // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from.toHex())
  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (!entity) {
  //   entity = new ExampleEntity(event.transaction.from.toHex())

  //   // Entity fields can be set using simple assignments
  //   entity.count = BigInt.fromI32(0)
  // }

  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // // Entity fields can be set based on event parameters
  // entity.src = event.params.src
  // entity.guy = event.params.guy

  // // Entities can be written to the store with `.save()`
  // entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DOMAIN_SEPARATOR(...)
  // - contract.PERMIT_TYPEHASH(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.decimals(...)
  // - contract.name(...)
  // - contract.nonces(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
  // - contract.version(...)
  // - contract.wards(...)
}


export function handleTransfer(event: Transfer): void {
  // let entity = ExampleEntity.load("0")
  
  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (!entity) {
  //   entity = new ExampleEntity("0")
  //   // Entity fields can be set using simple assignments
  //   entity.count = BigInt.fromI32(0)
  // }
    let entity = Token.load(event.address.toHex())
    let en = DayValuation.load(event.address.toHex())
    if(!entity || !en){ 
      entity = new Token(event.address.toHex())
      entity.src = event.address;
      entity.count = BigInt.fromI32(0)
      
      en = new DayValuation(event.address.toHex())
      en.src = event.address;
      en.count = BigInt.fromI32(0)
      en.lastBlock = event.block.timestamp.toI32()
    }
    if((event.block.timestamp.toI32() - en.lastBlock.toI32()) >= 86400){
      en.count = BigInt.fromI32(0)
      en.lastBlock = event.block.timestamp.toI32()
    }
    en.count = en.count.plus(BigInt.fromI32(1))
    entity.count = entity.count.plus(BigInt.fromI32(1))
    en.save()
    entity.save()
  //   entity.src = event.address;
  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count.plus(BigInt.fromI32(1))
  // // Entity fields can be set based on event parameters
  // // entity.src = event.params.src

  // // Entities can be written to the store with `.save()`
  // entity.save()
}
