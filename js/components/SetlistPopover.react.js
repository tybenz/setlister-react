var React = require( 'react' );
var SetlistPopoverListItem = require( './SetlistPopoverListItem.react' );
var SetlistStore = require( '../stores/SetlistStore' );
var Utils = require( '../utils' );
var $ = require( 'jquery' );

var SetlistPopover = React.createClass({
    getInitialState: function() {
        return {
            setlists: SetlistStore.getAll()
        }
    },

    componentDidUpdate: function() {
        var plus = $( '#plus-sign-' + this.props.relatedId )[ 0 ];
        if ( plus && this.props.show ) {
            var el = this.getDOMNode();
            var pos = Utils.positionElementAroundAnother( plus, el, {
                position: 'left',
                positionOffset: 5,
                align: 'center'
            });
            this.props.left = pos.x;
            this.props.top = pos.y;

            el.style.top = pos.y + 'px';
            el.style.left = pos.x + 'px';
            $( el ).addClass( 'left' );
        }
    },

    componentDidMount: function() {
        var component = this;
        $( window ).resize( function( evt ) {
            component.componentDidUpdate();
        });
    },

    _onSetlistClicked: function( evt ) {
        console.log( $( evt.currentTarget ).data( 'id' ) );
    },

    render: function() {
        var setlistData = this.state.setlists;

        var setlists = [];

        for ( var i in setlistData ) {
            if ( setlistData.hasOwnProperty( i ) ) {
                var setlistName = setlistData[ i ].title;
                setlists.push( React.DOM.div(
                    { onClick: this._onSetlistClicked, 'data-id': setlistData[ i ].id },
                    SetlistPopoverListItem( { name: setlistName } )
                ));
            }
        }

        return React.DOM.ul(
            {
                className: 'left setlist-popover popover list-group' + ( this.props.show ? ' show' : '' )
            },
            React.DOM.div( { className: 'arrow' } ),
            React.DOM.div(
                { classList: 'popover-content' },
                setlists
            )
        );
    }
});

module.exports = SetlistPopover;
