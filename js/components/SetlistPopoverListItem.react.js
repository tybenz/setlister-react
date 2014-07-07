var React = require( 'react' );

var SetlistPopoverListItem = React.createClass({
    render: function() {
        return React.DOM.li(
            { className: 'list-group-item' },
            this.props.name
        );
    }
});

module.exports = SetlistPopoverListItem;
