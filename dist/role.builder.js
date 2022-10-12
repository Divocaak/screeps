var findClosest = require('fn.findClosesEnergy');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }




        if (!creep.memory.building) {
            // má místo
            var source = findClosest.getDestination(creep, FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            // nemá místo
            var toBuild = findClosest.getDestination(creep, FIND_CONSTRUCTION_SITES);
            if (toBuild != null) {
                // build
                if (creep.build(toBuild) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(toBuild, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                // store
                var targetsStore = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                
                if (targetsStore.length > 0) {
                    if (creep.transfer(targetsStore[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetsStore[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        }
    }
};

module.exports = roleBuilder;