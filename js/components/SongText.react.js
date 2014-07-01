var React = require( 'react' );

var SongText = React.createClass({
    render: function() {
        return React.DOM.div({
            dangerouslySetInnerHTML: { __html: this._chordsHtml() }
        });
    },

    _chordsHtml: function() {
        var numbers = { 'Ab': 11, 'A': 0, 'A#': 1, 'Bb': 1, 'B': 2, 'C': 3, 'C#': 4, 'Db': 4, 'D': 5, 'D#': 6, 'Eb': 6, 'E': 7, 'F': 8, 'F#': 9, 'Gb': 9, 'G': 10, 'G#': 11 };
        var notes = {
            sharps: [ 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#' ],
            flats: [ 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab' ]
        };
        var chordRegex = /\b([A-G][b\#]?(2|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|mb5|m|sus|sus2|sus4)*)(?=[^A-z])/g;
        var oldKey = this.props.originalKey;
        var newKey = this.props.dataKey;

        function transposeNote( oldNote ) {
            var dub = oldNote.split( '/' );
            var notesArr = newKey.match( /b/g ) ? notes.flats : notes.sharps;

            for ( var i = 0, len = dub.length; i < len; i++ ) {
                var note = dub[ i ];
                regex = /([A-G])?(b|#)?(.*)?/g,
                extra = note.replace( regex, '$3' ),
                root_note = note.replace( regex, '$1$2' ),
                new_num = numbers[ root_note ] + ( numbers[ newKey ] - numbers[ oldKey ] ),
                new_note = new_num >= 0 ? notesArr[ new_num % 12 ] : notesArr[ new_num + 12 ];

                dub[ i ] = new_note + extra;
            }

            return dub.join( '/' );
        }

        this.props.text = this.props.text.replace( chordRegex, transposeNote );

        return this.props.text.replace( chordRegex, '<strong>$1 </strong>' ).replace( /<\/strong> /g, '</strong>' );
    }
});

module.exports = SongText;
