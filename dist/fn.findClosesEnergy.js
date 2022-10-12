var findClosestEnergy = {
    /** @param {Creep} creep **/
    /** @param {any} type **/
    getDestination: function(creep, type) {
        var sources = creep.room.find(type);
        var savedId = 0;
        var savedDist;
        for(var i = 0; i < sources.length; i++){
            var distToSource = creep.pos.getRangeTo(sources[i]);
            if(savedDist != null){
                if(distToSource < savedDist){
                    savedId = i;
                    savedDist = distToSource;
                }
            }else{
                savedDist = distToSource;
                savedId = i;
            }
        }
        return sources[savedId];
    }
};

module.exports = findClosestEnergy;