var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var autoSpawn = require('controller.autoSpawn');

var leveling = {
    200: [WORK, CARRY, MOVE], // same
    250: [WORK, CARRY, MOVE, MOVE], // 1 1 2
    300: [WORK, CARRY, CARRY, MOVE, MOVE], // 1 2 2
    400: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], // same
    450: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], // 2 2 3
    500: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], // 2 3 3
    600: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], // same
    450: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // 3 3 4
    500: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // 3 4 4
    600: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // same
    650: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], // 4 4 5
};

module.exports.loop = function () {
    
    // towers
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    // auto spawn
    var energyCost = Game.spawns["Spawn1"].room.energyCapacityAvailable;
    if(!leveling[energyCost]){
        energyCost -= 50;
    }
    autoSpawn.run("harvester", 2, leveling[energyCost]);
    autoSpawn.run("builder", 1, leveling[energyCost]);
    autoSpawn.run("upgrader", 1, leveling[energyCost]);

    // roles
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}