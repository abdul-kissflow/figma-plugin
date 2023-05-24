// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {width: 400, height: 300, title: "Star Generator"});

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = ({type, payload}) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  const { count, colorCount, fillcolorHex, nofillcolorHex, fill, nofill, spacing} = payload;
  console.log("inside values", count, colorCount, fillcolorHex, nofillcolorHex, fill, nofill, spacing);


  const frame = figma.createFrame();

  frame.paddingLeft = 64;
  frame.paddingRight = 64;
  frame.paddingTop = 64;
  frame.paddingBottom = 64;
  frame.layoutMode = "HORIZONTAL";

  frame.itemSpacing = spacing;

  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "AUTO";

  frame.name = `Star with count: ${count}, filled: ${colorCount}, fill-color: ${fillcolorHex}, nofill-color: ${nofillcolorHex}`;
  if (type === 'create-star') {
    for (let i = 0; i < count; i++) {
      const star = figma.createStar();
      star.x = 50;
      star.y = 50;
      star.fills = [{type: 'SOLID', color: i < colorCount - 1  ? fill : nofill}];
      star.innerRadius = 0.6;
      frame.appendChild(star);
    }
    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
