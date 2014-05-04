/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.ticket.TicketGrid', {
    extend: 'Ext.Component',
    alias: 'widget.ticketgrid',
    requires: ['Helpdesk.store.Tickets'],
    style: 'background-color: #ffffff;',
    padding: '0 10 10 10',
    data: [],
    currentSize: {},
    config: {
        pageSize: 2,
        currentStart: 0,
        currentLimit: 0,
        nextPagingEnabled: false,
        prevPagingEnabled: false
    },
    listeners: {
        pageNextLoaded: function() {
            this.pagingClickHandler("pageNext", this);
        },
        pagePrevLoaded: function() {
            this.pagingClickHandler("pagePrev", this);
        }
    },
    store: {},
    renderTpl: ['<div class="ticket-grid" >',
        '<table >',
        '<col style="width:3%">',
        '<col style="width:20%">',
        '<col style="width:32%">',
        '<col style="width:8%">',
        '<col style="width:11%">',
        '<col style="width:10%">',
        '<col style="width:6%">',
        '<col style="width:10%">',
        '<thead>',
        '<tr>',
        "<th id=\'id\'> ID</th>",
        "<th id=\'name\'> Cliente</th>",
        '<th id=\'assunto\'> Assunto</th>',
        '<th id=\'categoria\'> Categoria</th>',
        '<th id=\'status\'> Status </th>',
        '<th id=\'atualizado\'> Atualizado? </th>',
        '<th id=\'prazo\'> Prazo </th>',
        '<th id=\'prioridade\'> Prioridade</th>',
        '</tr>',
        '</thead>',
        '<tbody>',
        '</tbody>',
        '</table>',
        '<div id=\'ticketPaging\' class=\'ticket-grid-paging\'>',
        '<div class=\'ticket-paging-left\'>',
        '<img id=\'pageFirst\' src=\'extjs/resources/themes/images/gray/grid/page-first.gif\'/>',
        '<img id=\'pagePrev\'src=\'extjs/resources/themes/images/gray/grid/page-prev.gif\'/>',
        '<img id=\'pageNext\'src=\'extjs/resources/themes/images/gray/grid/page-next.gif\'/>',
        '<img id=\'pageLast\'src=\'extjs/resources/themes/images/gray/grid/page-last.gif\'/>',
        '<span style=\'float:right;\' class=\'ticket-paging-right\'></span>',
        '</div>',
        ,
                '</div>',
        '</div>'
    ],
    constructor: function(config) {
        // applyIf means only copy if it doesn't exist
        this.store = Ext.create('Helpdesk.store.Tickets', {});
        this.store.on({
            datachanged: function() {
                this.updateList(this.store.data.items);
            },
            scope: this
        });
        this.setCurrentLimit(this.getPageSize());
        this.callParent([config]);
    },
    initComponent: function() {
        this.on('afterrender', this.onAfterRender);
        this.callParent(arguments);
    },
    headerClickEvent: function(event) {
        var currentColumn = ($(this)[0]).id;
        var currentClass = $(this).attr("class");
        var scope = event.data.scope;
        $(".ticket-grid th").not("#" + currentColumn).removeClass("ascending");
        $(".ticket-grid th").not("#" + currentColumn).removeClass("descending");
        if (currentClass === null) {
            $(this).addClass("ascending");
        } else {
            if (currentClass === "descending") {
                $(this).removeClass("descending");
                $(this).addClass("ascending");
            } else {
                $(this).removeClass("ascending");
                $(this).addClass("descending");
            }

        }
        currentClass = $(this).attr("class");
        if (currentClass === 'ascending') {
            scope.data = Helpdesk.util.Util.sortAsc(scope.data, currentColumn);
        } else {
            scope.data = Helpdesk.util.Util.sortDesc(scope.data, currentColumn);
        }
        scope.updateList(scope.data);
    },
    updateList: function(array) {
        this.data = array;
        $(".ticket-grid tr:gt(0)").remove();
        $.each(array, function(i, val) {
            newRow = "<tr>" +
                    '<td><span>' + val.get('id') + '</span></td>' +
                    '<td><span>' + val.get('user').name + '</span></td>' +
                    '<td><span>' + val.get('title') + '</span></td>' +
                    '<td><span></span></td>' +
                    '<td><span></span></td>' +
                    '<td><span></span></td>' +
                    '<td><span></span></td>' +
                    '<td><span></span></td>' +
                    "</tr>";
            $('.ticket-grid tbody').append(newRow);
        });

        this.bindTooltip();
    },
    bindTooltip: function() {
        var showTooltip = function(event) {
            $('div.tooltip').remove();
            $('<div class="tooltip">' + event.target.innerText + '</div>').appendTo('body');
            changeTooltipPosition(event);
        };
        var changeTooltipPosition = function(event) {
            var tooltipX = event.pageX - 8;
            var tooltipY = event.pageY + 8;
            $('div.tooltip').css({top: tooltipY, left: tooltipX});
        };
        var hideTooltip = function() {
            $('div.tooltip').remove();
        };
        $(".ticket-grid td > span").bind({
            mousemove: changeTooltipPosition,
            mouseenter: showTooltip,
            mouseleave: hideTooltip
        });
    },
    onAfterRender: function(grid) {
        this.bindTooltip();
        $(".ticket-grid th").bind("click", {scope: this}, this.headerClickEvent);
    },
    updatePagingDisplayStatus: function() {
        var displayStart = (this.getCurrentStart() + 1);
        var displayLimit = this.getCurrentLimit() >= this.getCurrentSize() ? this.getCurrentSize() : this.getCurrentLimit();
        $(".ticket-paging-left > span").text(translations.DISPLAYING + " " + displayStart + " - " + displayLimit + " " + translations.OF + " " + this.getCurrentSize());
        if (this.getCurrentStart() <= 0) {
            this.disablePagingPrevAndFirst();
        }
        if (this.getCurrentSize() <= this.data.length) {
            this.disablePagingNextAndLast();
        }
        if (this.getCurrentSize() > this.data.length && this.getNextPagingEnabled() === false) {
            this.enablePagingNextAndLast(this);
        }
    },
    pagingClickHandler: function(type, scope) {
        if (type === "pageNext") {
            scope.updatePagingDisplayStatus();
            if (scope.getPrevPagingEnabled() === false) {
                scope.enablePagingPrevAndFirst(scope);
            }
            if (scope.getCurrentLimit() >= scope.getCurrentSize()) {
                scope.disablePagingNextAndLast(scope);
            }
        }
        if (type === "pagePrev") {
            if (scope.getCurrentLimit() >= scope.getCurrentSize()) {
                scope.enablePagingNextAndLast(scope);
            }
            scope.updatePagingDisplayStatus();
        }
    },
    pagingClickEvent: function(event) {
        var scope = event.data.scope;
        if (event.target.id === "pageNext") {
            scope.setCurrentStart(scope.getCurrentStart() + scope.getPageSize());
            scope.setCurrentLimit(scope.getCurrentLimit() + scope.getPageSize());
            scope.fireEvent("pageNext");
        } else if (event.target.id === "pagePrev") {
            scope.setCurrentStart(scope.getCurrentStart() - scope.getPageSize());
            scope.setCurrentLimit(scope.getCurrentLimit() - scope.getPageSize());
            scope.fireEvent("pagePrev");

        } else if (event.target.id === "pageFirst") {
            console.log("Page Fist");
        } else if (event.target.id === "pageLast") {
            console.log("Page Last");
        }
    },
    enablePagingNextAndLast: function(scope) {
        $("img#pageNext").attr("src", "extjs/resources/themes/images/gray/grid/page-next.gif");
        $("img#pageNext").bind("click", {scope: scope}, scope.pagingClickEvent);
        $("img#pageNext").removeClass("no-hover-pointer");
        $("img#pageLast").attr("src", "extjs/resources/themes/images/gray/grid/page-last.gif");
        $("img#pageLast").bind("click", {scope: scope}, scope.pagingClickEvent);
        $("img#pageLast").removeClass("no-hover-pointer");
        this.setNextPagingEnabled(true);
    },
    disablePagingNextAndLast: function() {
        $("img#pageNext").attr("src", "extjs/resources/themes/images/gray/grid/page-next-disabled.gif");
        $("img#pageNext").unbind("click");
        $("img#pageNext").addClass("no-hover-pointer");
        $("img#pageLast").attr("src", "extjs/resources/themes/images/gray/grid/page-last-disabled.gif");
        $("img#pageLast").unbind("click");
        $("img#pageLast").addClass("no-hover-pointer");
        this.setNextPagingEnabled(false);
    },
    enablePagingPrevAndFirst: function(scope) {
        $("img#pagePrev").attr("src", "extjs/resources/themes/images/gray/grid/page-prev.gif");
        $("img#pagePrev").bind("click", {scope: scope}, scope.pagingClickEvent);
        $("img#pagePrev").removeClass("no-hover-pointer");
        $("img#pageFirst").attr("src", "extjs/resources/themes/images/gray/grid/page-first.gif");
        $("img#pageFirst").bind("click", {scope: scope}, scope.pagingClickEvent);
        $("img#pageFirst").removeClass("no-hover-pointer");
        this.setPrevPagingEnabled(true);
    },
    disablePagingPrevAndFirst: function() {
        $("img#pagePrev").attr("src", "extjs/resources/themes/images/gray/grid/page-prev-disabled.gif");
        $("img#pagePrev").unbind("click");
        $("img#pagePrev").addClass("no-hover-pointer");
        $("img#pageFirst").attr("src", "extjs/resources/themes/images/gray/grid/page-first-disabled.gif");
        $("img#pageFirst").unbind("click");
        $("img#pageFirst").addClass("no-hover-pointer");
        this.setPrevPagingEnabled(false);
    },
    setCurrentData: function(data) {
        this.currentData = data;
    },
    getCurrentData: function() {
        return currentData;
    },
    createTable: function() {
    },
    setCurrentSize: function(size) {
        this.currentSize = size;
        this.updatePagingDisplayStatus();
    },
    getCurrentSize: function() {
        return this.currentSize;
    }

});

