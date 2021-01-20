const apiHost = 'http://localhost:4000'; // used for docker
// const apiHost = 'http://bark-recruit-api.local'; // used for vagrant

// onload
$(document).ready(function(){

    $('.js-autocomplete-services').autoComplete({
        resolverSettings: {
            url: `${apiHost}/api/services`
        }
    });

    $('.js-autocomplete-location').autoComplete({
        resolverSettings: {
            url: `${apiHost}/api/locations`
        }
    });

    (new LeadsList).init()

});

class LeadsList {

    init() {
        this.loadList();
        this.initDomItems();
        this.templateListItem = Handlebars.compile($('#handlebars-template-list-item').html());
        this.templateLeadDetail = Handlebars.compile($('#handlebars-template-lead-detail').html());
        this.templateContactDetail = Handlebars.compile($('#handlebars-template-contact-detail').html());
        this.templateLeadPurchased = Handlebars.compile($('#handlebars-template-lead-purchased').html());
        this.initListeners();
        this.currentLead = null;
    }

    initDomItems() {
        this.leadListDom = $('#js-lead-list');

        this.leadDetailModalDom = $('#js-lead-details');
        this.leadDetailModalBodyDom = $('#js-lead-details .modal-body');

        this.filterServiceDom = $('input[name=service_id]');
        this.filterLocationDom = $('input[name=location_id]');

        this.purchaseContactEmailDom = $('input[name=prof_email]');
        this.purchaseContactPhoneDom = $('input[name=prof_phone]');

        this.searchButtonDom = $('#js-search-button')
    }

    initListeners() {
        this.leadListDom.on(
            'click', '.js-list-item',
            (event) => this.loadLeadDetail($(event.currentTarget).data('leadId'))
        );
        this.searchButtonDom.click((event) => {
            event.preventDefault();
            this.loadList()
        });

        this.leadDetailModalDom.on(
            'click', '#js-back',
            (event) => this.loadLeadDetail(this.currentLead.id)
        );

        this.leadDetailModalDom.on(
            'click', '#js-purchase-lead',
            (event) => this.purchaseLead(event)
        );

        this.leadDetailModalDom.on(
            'click', '#js-purchase-contact-form',
            () => this.renderContactPurchaseRequest()
        );
    }

    loadLeadDetail(id) {
        this.getLeadFromApi(id)
            .then(response => response.json())
            .then(lead => this.renderLead(lead.data));
    }

    loadList() {
        this.getListFromApi()
            .then(response => response.json())
            .then(leadList => this.renderList(leadList.data));
    }

    renderList(leadList) {
        this.leadListDom.html('');
        for (let lead of leadList) {
            if (this.displayLead(lead)) {
                let leadHtml = this.templateListItem(lead);
                this.leadListDom.append(leadHtml);
            }
        }
    }

    displayLead(lead) {
        let serviceIdFilter = parseInt(this.filterServiceDom.val());
        let locationIdFilter = parseInt(this.filterLocationDom.val());

        if (serviceIdFilter && lead.service_id !== serviceIdFilter) {
            return false;
        }
        if (locationIdFilter && lead.location_id !== locationIdFilter) {
            return false;
        }

        return true;
    }

    renderLead(lead) {
        this.currentLead = lead;
        this.leadDetailModalBodyDom.html(this.templateLeadDetail(lead));
        this.leadDetailModalDom.modal('show');
    }

    renderContactPurchaseRequest() {
        this.leadDetailModalBodyDom.html(this.templateContactDetail(this.currentLead));
    }

    renderPurchasedLead(lead) {
        this.leadDetailModalBodyDom.html(this.templateLeadPurchased(lead));
    }

    purchaseLead(event) {
        event.preventDefault();

        let id = $(event.currentTarget).data('leadId'),
            email = $('input[name=prof_email]').val(),
            phone = $('input[name=prof_phone]').val();

        if (email && phone) {
            let formData = new FormData();
            formData.append('email', email);
            formData.append('phone', phone);

            this.purchaseLeadApi(id, formData)
                .then(response => response.json())
                .then(lead => this.renderPurchasedLead(lead.data));
        }
    }

    getListFromApi() {
        return fetch(
            `${apiHost}/api/leads`,
            {
                method: 'GET'
            }
        )
    }

    getLeadFromApi(id) {
        return fetch(
            `${apiHost}/api/leads/${id}`,
            {
                method: 'GET'
            }
        )
    }

    purchaseLeadApi(id, data) {
        return fetch(
            `${apiHost}/api/leads/${id}/purchase`,
            {
                method: 'POST',
                body: data
            }
        )
    }

}
