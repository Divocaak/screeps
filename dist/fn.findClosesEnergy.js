var findClosestEnergy = {
    /** @param {Creep} creep **/
    getSource: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
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
        
        //console.log(creep.name + " move to " + sources[savedId].pos);
        return sources[savedId];
    }
};

module.exports = findClosestEnergy;