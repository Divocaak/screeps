var findClosest = require('fn.findClosesEnergy');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        /* if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        } */

        if (creep.store.getFreeCapacity() > 0) {
            // má místo
            var source = findClosest.getSource(creep);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            // nemá místo
            var targetsBuild = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targetsBuild.length) {
                // build
                if (creep.build(targetsBuild[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetsBuild[0], { visualizePathStyle: { stroke: '#ffffff' } });
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