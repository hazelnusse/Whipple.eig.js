goog.provide('whipple.eig.Parameters');
/**
 * @param {!Element} theElements
 * @constructor
 */
whipple.eig.Parameters = function(thePositionElement){
    this.theElement = goog.dom.createDom('span',
    {
        'class': 'social-popup'
    });
    goog.dom.append(/** @type {!Node} */thePositionElement,this.theElement)
    goog.base(this,this.theElement);
    this.setHideOnEscape(true);
    this.setAutoHide(false);
    this.setPosition(new goog.positioning.AnchoredViewportPosition(
        thePositionElement,
        goog.positioning.Corner.TOP_LEFT));
    //TODO calculate this from size of span and size of popup.
    var theSpanSize = goog.style.getSize(thePositionElement);
    var thePopUpSize = goog.style.getSize(this.theElement);
    //    this.logger_.info('Popupsize:'+String(thePopUpSize))
    var margin = new goog.math.Box(-thePopUpSize.height-theSpanSize.height/2,
        0, 0,
        -thePopUpSize.width/2+theSpanSize.width/2);
    this.setMargin(margin);
};
