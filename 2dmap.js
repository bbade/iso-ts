// 2dmap.js

function Map2d(
    world, // from world.js
    canvas, // an output canvas, 2d
) {

    let showElevation = false; // this will be used later

    return {

        render() {
            // todo: simply draw the world's 2d texture to our canvas, scaled up to match our canvas size using nearest neighbor
        },

        setShowElevation(show) {
            showElevation = show;
        },

    } // end object
}; // end function