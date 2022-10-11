var autoSpawner = {

    /** @param {String} roleId **/
    /** @param {int} creepsCount **/
    run: function(roleId, creepsCount) {

        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var creepsOfType = _.filter(Game.creeps, (creep) => creep.memory.role == roleId);

        if(creepsOfType.length < creepsCount) {
            var newName = (roleId.toString() + "_" + Game.time + "_2");
            console.log('Spawning new creep: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                {memory: {role: roleId}});
        }

        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
            }
    }
};

module.exports = autoSpawner;