
/**SIDE BAR */
export const toggleSidebar = (id) => {
    const elem = document.getElementById(id);
    const classes = elem.className.split(' ');
    const collapsed = classes.indexOf('collapsed') !== -1;

    const padding = {};

    if (collapsed) {
        // Remove the 'collapsed' class from the class list of the element, this sets it back to the expanded state.
        classes.splice(classes.indexOf('collapsed'), 1);

        padding[id] = 300; // In px, matches the width of the sidebars set in .sidebar CSS class
        map.easeTo({
            padding,
            duration: 1000 // In ms, CSS transition duration property for the sidebar matches this value
        });
    } else {
        padding[id] = 0;
        // Add the 'collapsed' class to the class list of the element
        classes.push('collapsed');

        map.easeTo({
            padding,
            duration: 1000
        });
    }

    // Update the class list on the element
    elem.className = classes.join(' ');
}