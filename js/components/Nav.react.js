var React = require( 'react' );

var Nav = React.createClass({
    render: function() {
        return React.DOM.header(
            { className: 'navbar navbar-default navbar-fixed-top' },
            React.DOM.div(
                { className: 'container' },
                React.DOM.div(
                    { className: 'navbar-header' },
                    React.DOM.a( { href: '#', className: 'navbar-brand' }, 'Setlister' )
                ),
                React.DOM.div(
                    { className: 'navbar-collapse collapse' },
                    React.DOM.ul(
                        { className: 'nav navbar-nav navbar-right' },
                        React.DOM.li( {}, React.DOM.a( { href: '#' }, 'Test' ) )
                    )
                )
            )
        )
    }
});

module.exports = Nav;
