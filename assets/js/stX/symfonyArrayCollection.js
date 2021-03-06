
require("assets/js/stX/random.js");

/**
 * Ajoute un bouton pour ajouter des nouveau entities au Collection
 */
$.fn.stXarrayCollection = function() {

    this.widget = this;
    var widget = this.widget;
    var deleteButtonCounter = 0;
    var rowCounter = widget.find('div.row').length;

    var addbuttonClass = "addButton";
    var removeButtonClass = "col-md-1 deleteButton";

    var uniqueid = stXmakeId();

    this.buttonId = 'theAddButton-' + uniqueid;

    this.addDeleteButton = function ($element) {
        var newIndex = deleteButtonCounter++;
        var removeButtonId = "deleteButton" + uniqueid + newIndex;

        let removeText = widget.data('remove-text');
        if(!removeText) {
            removeText = '<i class="fa fa-plus" aria-hidden="true"></i>';
        }

        let $deleteButton = $('<div class="' + removeButtonClass + '" >'+
            '<button class="btn" id="'+removeButtonId+'">'+removeText+'</button>'+
            '</div>');
        let $container = $element.find('.deleteButtonContainer');

        if ($container.length > 0) {
            $container.append($deleteButton);
        } else {
            $element.append($deleteButton);
        }

        $('#'+removeButtonId).click(function (e) {
            $element.remove();
            return false;
        });
    };

    this.addDeleteButtons = function () {
        widget.find('>div.row').each(function (index, obj) {
            widget.addDeleteButton($(obj));
        });
    };

    this.addAddButton = function () {
        const addButtonId = widget.buttonId;

        let addText = widget.data('add-text');
        if(!addText) {
            addText = '<i class="fa fa-plus" aria-hidden="true"></i>';
        }

        widget.parent().append('<div title="Crtl + Space" class="' + addbuttonClass + '" >'+
            '<button class="btn" id="'+addButtonId+'">'+addText+'</button>'+
            '</div>');

        $('#'+addButtonId).click(function (e) {
            widget.doAddRow(e);
        });
    };

    this.doAddRow = function (e) {

        e.preventDefault();
        var content = widget.attr('data-prototype');
        var newIndex = rowCounter++;
        content = content.replace(/__name__/g, newIndex);
        var $content = $(content);
        widget.append($content);
        widget.addDeleteButton($content);
        $content.find('.stXautoComplete').each(function (index, obj) {
            $(obj).stXautoComplete();
        });
        $content.find('div.symfonyArrayCollection').each(function (index, obj) {
            $(obj).stXarrayCollection();
        })
        return false;
    }

    this.addDeleteButtons();
    this.addAddButton();

};


$('div.symfonyArrayCollection').each(function (index, obj) {
    $(obj).stXarrayCollection();
})

jQuery(document).bind("keydown", function(e){
    if(e.ctrlKey && e.keyCode == 32){
        $active = $(document.activeElement);
        $widget = $active.parents('.symfonyArrayCollection');
        $widget.parent().find('.addButton button').trigger('click');
        return false;
    }
});
