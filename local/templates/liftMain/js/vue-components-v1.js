'use strict';

let RNP_modal_v1;


document.addEventListener("DOMContentLoaded", () => {

    RNP_modal_v1 = new Vue({
        //  animation
        //  iframe
        //  sign-view-doc
        //  view-doc
        //  custom
        //  alert
        //  confirm
        //  confirm-custom
        //  sign
        //  reload
        name: 'Модальное окно v1',
        el: '#rnp-modal',
        data: function() {
            return {
                show: false,
                data: {
                    callback: '',
                    content: '',
                    button: [],
                    action: '',
                    class: '',
                    type: '',
                }
            }
        },
        beforeCreate: function() {
            document.body.insertAdjacentHTML('afterbegin', '<div id="rnp-modal"></div>');
            this.fix_mr = 0;
        },
        watch: {
            'show': function() {

                let body = document.querySelector('body');
                let back = document.querySelector('#rnp-page-wrapper');
                if (!back) back = document.createElement('div');

                if (this.show) {
                    back.style.filter = 'grayscale(0%) blur(0px)';
                    back.classList.add('rnp-page-wrapper-filter');
                    let margin = parseInt(body.style.paddingRight);
                    this.fix_mr = body.offsetWidth;
                    body.classList.add('hidden-scroll');
                    this.fix_mr = body.offsetWidth - this.fix_mr;
                    if (!margin) margin = this.fix_mr;
                    else margin = margin + this.fix_mr;
                    body.style.paddingRight = margin + 'px';
                }
                else {
                    setTimeout(() => {
                        back.classList.remove('rnp-page-wrapper-filter');
                        let margin = parseInt(body.style.paddingRight);
                        if (!margin) margin = this.fix_mr;
                        else margin = margin - this.fix_mr;
                        back.style.filter = 'none';
                        body.style.transitionDuration = '0s';
                        body.style.paddingRight = margin + 'px';
                        body.classList.remove('hidden-scroll');
                        body.style.removeProperty('transitionDuration');
                        if (this.data.callback) {
                            this.data.callback();
                        }
                    }, 150);
                }
            }
        },
        methods: {
            open: function(obj) {
                this.show = true;
                this.setData(obj);
            },
            close: function(obj) {
                this.show = false;
                this.setData(obj);
            },
            setData: function(obj) {
                for (let i in this.data) {
                    if (i in obj) this.data[i] = obj[i];
                    else {
                        if (i === 'button') this.data[i] = [];
                        else this.data[i] = '';
                    }
                }
            },
            positive: function() {
                this.data.action.positive();
                this.show = false;
            },
            negative: function() {
                this.data.action.negative();
                this.show = false;
            },
            negativeCustom: function() {
                if (this.data.action.negativeCustom) {
                    this.data.action.negativeCustom();
                }
                this.show = false;
            },
            change: function() {
                this.data.action.change();
            },
            reload: function() {
                this.data.type = 'animation';
                location.reload();
            },
            alertButton: function() {
                if (this.data.action == '') this.show = false;
                else this.data.action.change();
            }
            
        },
        template: `
            <transition name="rnp-modal">
                <div
                    v-if="show"
                    class="style-vue rnp-modal-back"
                >

                    <div v-if="data.type == 'animation'">
                        <rnp-animation-loader-v1 />
                    </div>

                    <div 
                        v-else
                        :class="data.class"
                        class="rnp-modal-panel panel-list"
                    >

                        <div v-if="data.type === 'iframe'" style="position: relative; width: 400px; height: 270px">
                            <iframe :src="data.content" style="position: absolute; width: 400px; height: 270px; z-index: 1;"></iframe>
                            <div style="height: 100%; display: flex; align-items: center; justify-content: center;">
                                <rnp-animation-loader-v1 />
                            </div>
                        </div>

                        <div
                            v-else-if="data.type === 'sign-view-doc' || data.type === 'view-doc'"
                            style="position: relative; width: 100%; height: calc(100% - 8rem);"
                        >
                            <iframe :src="data.content" style="position: absolute; width: 100%; height: 100%; z-index: 1;"></iframe>
                        </div>

                        <div v-else v-html="data.content" />

                        <br />

                        <div
                            v-if="data.type == 'sign-view-doc'"
                            style="flex-wrap: nowrap"
                            class="row center-xs"
                        >
                            <button
                                @click="change"
                                class="button button-small button-red"
                                style="margin: 0 1rem 0 2rem"
                            >Подписать</button>
                            <button
                                @click="negative" 
                                class="button button-small button-outline"
                                style="margin: 0 2rem 0 1rem"
                            >Отмена</button>
                        </div>

                        <div
                            v-if="data.type == 'view-doc'"
                            style="flex-wrap: nowrap"
                            class="row center-xs"
                        >
                            <button
                                @click="positive"
                                class="button button-small button-red"
                                style="margin: 0 1rem 0 2rem"
                            >Скачать</button>
                            <button
                                @click="negative" 
                                class="button button-small button-outline"
                                style="margin: 0 2rem 0 1rem"
                            >Отмена</button>
                        </div>

                        <div
                            v-else-if="data.type == 'custom'"
                            v-html="data.button"
                            class="row row-pb-0 center-xs"
                        />

                        <div v-else class="row row-pb-0 center-xs">

                            <template v-if="data.type == 'alert'">
                                <div class="col-xs-12 center-xs">
                                    <button
                                        @click="alertButton"
                                        class="w-100 button button-small button-red"
                                    >{{ data.button[0] || 'ОК' }}</button>
                                </div>
                            </template>

                            <template v-if="data.type == 'iframe'">
                                <div class="col-xs-12 center-xs">
                                    <button
                                        @click="change"
                                        class="button button-small button-red"
                                    >Закрыть</button>
                                </div>
                            </template>

                            <template v-else-if="data.type == 'confirm'">
                                <div v-if="data.action.positive" class="col-xs-12 col-sm-6 mt-1">
                                    <button
                                        @click="positive"
                                        class="w-100 button button-small button-red"
                                    >{{ data.button[0] || 'ДА' }}</button>
                                </div>
                                <div v-if="data.action.change" class="col-xs-12 col-sm-6 mt-1">
                                    <button
                                        @click="change"
                                        class="w-100 button button-small button-red"
                                    >{{ data.button[0] || 'ДА' }}</button>
                                </div>
                                <div class="col-xs-12 col-sm-6 mt-1">
                                    <button
                                        @click="show = false" 
                                        class="w-100 button button-small button-outline"
                                    >{{ data.button[1] || 'НЕТ' }}</button>
                                </div>
                            </template>

                            <template v-else-if="data.type == 'confirm-custom'">
                                <div v-if="data.action.positive" class="col-xs-12 col-sm-6 mt-1">
                                    <button
                                        @click="positive"
                                        class="w-100 button button-small button-red"
                                    >{{ data.button[0] || 'ДА' }}</button>
                                </div>
                                <div v-if="data.action.change" class="col-xs-12 col-sm-6 mt-1">
                                    <button
                                        @click="change"
                                        class="w-100 button button-small button-red"
                                    >{{ data.button[0] || 'ДА' }}</button>
                                </div>
                                <div class="col-xs-12 col-sm-6 mt-1">
                                    <button
                                        @click="negativeCustom" 
                                        class="w-100 button button-small button-outline"
                                    >{{ data.button[1] || 'НЕТ' }}</button>
                                </div>
                            </template>

                            <template v-else-if="data.type == 'sign'">
                                <div class="col-xs-6">
                                    <button
                                        @click="change"
                                        class="w-100 button button-small button-red"
                                    >Подписать</button>
                                </div>
                                <div class="col-xs-6">
                                    <button
                                        @click="negative" 
                                        class="w-100 button button-small button-outline"
                                    >Отмена</button>
                                </div>
                            </template>

                            <template v-else-if="data.type == 'reload'">
                                <div class="col-xs-12">
                                    <button
                                        @click="reload"
                                        class="w-100 button button-small button-red"
                                    ><nobr>Перезагрузить страницу</nobr></button>
                                </div>
                            </template>

                        </div>
                    </div>

                </div>
            </transition>
        `
    });

    window.addEventListener('beforeunload', e => {
        RNP_APP_v1.exit = true;
    });

});


let RNP_APP_v1 = {
    exit: false,
    init: function(data) {
        if (('form' in data) && ('units' in data) && ('data' in data)) {
            data.form.ajax = false;
            data.form.syncData = 0;
        } else {
            if ('error' in data) {
                if (!data.error) {
                    data.error = 'Error';
                }
            } 
            else data.error = 'Error';
        }
        return data;
    },
    query: function(param, callback, controller = false) {
        let data = new FormData();
        for (let i in param) data.append(i, param[i]);
        let option = { method: 'POST', body: data };
        if (controller) option.signal = controller;
        return fetch(param.url, option).then(
            res => {
                if (res.status == 200) {
                    res.json().then(
                        (res) => {
                            if (!('status' in res)) {
                                res = {
                                    'status': 1000,
                                    'status_msg': 'Неудалось получить данные (status)',
                                    'data': false
                                };
                            }
                            callback({'res': res});
                        },
                        () => callback({
                            'res': {
                                'status': 1000,
                                'status_msg': 'Неудалось получить данные (json)',
                                'data': false
                            }
                        })
                    );                    
                }
                else {
                    callback({
                        'res': {
                            'status': 1000,
                            'status_msg': res.status + ' : ' + res.statusText,
                            'data': false
                        }
                    });                    
                }
            },
            () => {
                if (RNP_APP_v1.exit) return false;
                if ('signal' in option) return false;
                callback({
                    'res': {
                        'status': 1000,
                        'status_msg': 'Сервер недоступен',
                        'data': false
                    }
                });
            }
        );
    },
    errorQuery: function(res, all = true, custom = {}) {
        let html = false;
        if (res.status === 0) {
            if (res.data.error && all) {
                html = '<h3>Ошибка</h3><p>' + res.data.error + '</p>';
            }
        } else {
            html = '<h3>Ошибка</h3><p>' + res.status_msg + '</p>';
        }
        if (html) {
            let param = {type: 'alert', content: html, class: 'col'};
            if (custom) {
                for (let i in custom) {
                    param[i] = custom[i];
                }
            }
            RNP_modal_v1.open(param);
            return true;
        } else {
            return false;
        }
    },
    dataForSend: function(value) {
        if (Array.isArray(value)) {
            let temp = [];
            for (let v in value) {
                if (Array.isArray(value[v])) {
                    let data = {};
                    for (let b in value[v]) {
                        data[b] = value[v][b]
                    }
                    temp.push(data);
                } else {
                    temp.push(value[v]);
                }
            }
            return temp;
        }
        return value;
    },
    dataUnitForSend: function(units) {
        let send = {};
        for (let i in units) {
            if ('value' in units[i]) {
                if (units[i].data) {
                    send[i] = this.dataForSend(units[i].value);
                }
            }
            if ('wrapper' in units[i]) {
                if (Array.isArray(units[i].units)) {
                    send[i] = [];
                    for (let w of units[i].units) {
                        send[i].push(this.dataUnitForSend(w));
                    }
                } else {
                    send = Object.assign(send, this.dataUnitForSend(units[i].units));
                }
            }
        }
        return send;
    },
    sortFilter: function(data, field) {
        let temp = [];
        Object.keys(data)
              .sort((a, b) => data[a][field] > data[b][field])
              .forEach(i => temp.push(data[i]));
        return temp;
    },
    reg: {
        'RU-': /[^а-яА-ЯёЁ-\s]/g,
        'EN-': /[^a-zA-Z-\s]/g,
        'DIG': /[^0-9]/g,
        'DT-': /[^0-9а-яА-ЯёЁa-zA-Z-]/g
    }
};


Vue.component('rnp-bar-selector-v1', {
    props: ['data', 'index'],
    methods: {
        change: function(index) {
            if (this.data.disabled) return false; 
            let i = this.data.value.indexOf(index);
            if (i >= 0) this.data.value.splice(i, 1);
            else this.data.value.push(index);
        }
    },
    template: `
        <div class="row row-p-0">
            <div class="col-xs-12 bar-selector">
                <div class="bar-selector bar-selector-title">{{ data.label }}</div>
                <div class="bar-selector bar-selector-buttons">
                    <button
                        v-for="(item, i) in $root.refs[data.refs]"
                        :key="index + '.' + i"
                        @click="change(i)"
                        :class="{'selected': data.value.includes(i)}"
                        :disabled="data.dis_value.includes(i)"
                        class="btn"
                        type="button"
                    >
                        <div class="title">{{ item }}</div>
                        <div v-if="data.dis_value.includes(i)" class="title-info">
                            {{ data.sublilte }}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `
});


Vue.component('rnp-animation-loader-v1', {
    template: `
        <svg class="animation-load" width="100" height="100" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="
                    M41 21C41 24.9556 39.827 28.8224 37.6294 32.1114C35.4318 35.4004 32.3082 
                    37.9638 28.6537 39.4776C24.9991 40.9913 20.9778 41.3874 17.0982 40.6157C13.2186 
                    39.844 9.65491 37.9392 6.85786 35.1421C4.06081 32.3451 2.156 28.7814 1.38429 
                    24.9018C0.61259 21.0222 1.00866 17.0009 2.52241 13.3463C4.03616 9.69181 6.59961 
                    6.56824 9.8886 4.37061C13.1776 2.17298 17.0444 1 21 1
                "
                stroke="#AF2127"
                stroke-width="2"
                fill="none"
            />
        </svg>
    `
});


Vue.component('rnp-animation-loader-white-v1', {
    template: `
        <svg class="animation-load" width="100" height="100" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="
                    M41 21C41 24.9556 39.827 28.8224 37.6294 32.1114C35.4318 35.4004 32.3082 
                    37.9638 28.6537 39.4776C24.9991 40.9913 20.9778 41.3874 17.0982 40.6157C13.2186 
                    39.844 9.65491 37.9392 6.85786 35.1421C4.06081 32.3451 2.156 28.7814 1.38429 
                    24.9018C0.61259 21.0222 1.00866 17.0009 2.52241 13.3463C4.03616 9.69181 6.59961 
                    6.56824 9.8886 4.37061C13.1776 2.17298 17.0444 1 21 1
                "
                stroke="#FFFFFF"
                stroke-width="2"
                fill="none"
            />
        </svg>
    `
});


Vue.component('rnp-informer-v1', {
    template: `
        <div class="row">
            <div class="col-xs-12">
                <slot />
            </div>
        </div>
    `
});


Vue.component('rnp-support-contact-v1', {
    props: ['data'],
    methods: {
        getPhone: function(data) {
            return data.split(',')[0].replace(/[^\d]/g, '');
        }
    },
    template: `
        <div v-if="data.length" class="support-info">
            <div v-for="support in data" class="row">
                <div class="col-xs-12 col-sm-4">
                    <div class="support-contact-title">Поддержка по программе</div>
                    <div v-html="support.title" class="support-contact-data" />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <div class="support-contact-title">Телефон</div>
                    <div class="support-contact-data">
                        <a
                            :href="'tel:+' + getPhone(support.phone)"
                            v-html="support.phone"
                            class="program__contact-link"
                        />
                    </div>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <div class="support-contact-title">Электронная почта</div>
                    <div class="support-contact-data">
                        <a
                            :href="'mailto:' + support.email"
                            v-html="support.email"
                            class="program__contact-link"
                        />
                    </div>
                </div>
            </div>
        </div>
    `
});


Vue.component('rnp-form-v1', {
    props: ['form', 'units', 'data', 'index'],
    created: function() {
        this.arrFormModify(this.form);
        this.arrUnitModify(this.units);
        this.arrDataModify(this.data);
        this.$root.$set(this.$root.form, 'event_resize', 1);
        window.addEventListener('resize', () => {
            if (++this.$root.form.event_resize > 999999) {
                this.$root.form.event_resize = 0;
            }
        });
    },
    watch: {
        'form.syncData': function() {
            if (this.$root.form.syncData > 999999) {
                this.$root.form.syncData = 0;
            }
            this.arrDataModify(this.data);
        },
    },
    computed: {
        index_calc: function() {
            if (typeof this.index != 'undefined') {
                return this.index;
            } else {
                return 'FX';
            }
        }
    },
    methods: {
        arrFormModify: function(arrForm) {
            if ('blocks' in arrForm) {
                for (let b in arrForm.blocks) {
                    if (!('visible' in arrForm.blocks[b])) {
                        this.$set(arrForm.blocks[b], 'visible', true);
                    }
                    if ('blocks' in arrForm.blocks[b]) {
                        this.arrFormModify(arrForm.blocks[b]);
                    }
                    if (('tabs' in arrForm.blocks[b])) {
                        let key = Object.keys(arrForm.blocks[b].tabs)[0];
                        if ('tab_selected' in arrForm.blocks[b]) {
                            let ts = arrForm.blocks[b].tab_selected;
                            arrForm.blocks[b].tab_selected = arrForm.blocks[b].tabs[ts] ? ts : key;
                        } else {
                            this.$set(arrForm.blocks[b], 'tab_selected', key);
                        }

                        for (let bb in arrForm.blocks[b].tabs) {
                            if (!('visible' in arrForm.blocks[b].tabs[bb])) {
                                this.$set(arrForm.blocks[b].tabs[bb], 'visible', true);
                            }
                            if ('blocks' in arrForm.blocks[b].tabs[bb]) {
                                this.arrFormModify(arrForm.blocks[b].tabs[bb]);
                            }
                        }
                    }
                }
            }
        },
        arrUnitModify: function(arrUnit) {
            for (let i in arrUnit) {
                if ('wrapper' in arrUnit[i]) {
                    if ('case' in arrUnit[i]) {
                        if (!('view' in arrUnit[i])) this.$set(arrUnit[i], 'view', true);
                        this.arrUnitModify(arrUnit[i].case);
                    } else {
                        this.arrUnitModify(arrUnit[i].units);
                    }
                } else {
                    if ('type' in arrUnit[i]) {
                        if (!('view' in arrUnit[i])) this.$set(arrUnit[i], 'view', true);
                        if (!('required' in arrUnit[i])) this.$set(arrUnit[i], 'required', false);
                        if (!('disabled' in arrUnit[i])) this.$set(arrUnit[i], 'disabled', false);
                        if (!('dis_em_d' in arrUnit[i])) this.$set(arrUnit[i], 'dis_em_d', true);
                        if (!('class' in arrUnit[i])) this.$set(arrUnit[i], 'class', 'col-xs-12');
                        if (!('invalid' in arrUnit[i])) this.$set(arrUnit[i], 'invalid', '');
                        if (!('invalid_view' in arrUnit[i])) this.$set(arrUnit[i], 'invalid_view', true);
                    }
                }
            }
        },
        arrDataModify: function(arrData, arrUnit = this.units, wrapper = null) {
            for (let u in arrUnit) {
                if ('wrapper' in arrUnit[u]) {
                    if ('case' in arrUnit[u]) {
                        this.arrDataModify(arrData[arrUnit[u].data], arrUnit[u].case, arrUnit[u].wrapper);
                        this.inputDataUnitCase(arrUnit[u], arrData[arrUnit[u].data]);
                    } else {
                        this.arrDataModify(arrData, arrUnit[u].units);
                    }
                } else {
                    if (!('value' in arrUnit[u])) {
                        this.$set(arrUnit[u], 'value', '');
                    }
                    if (wrapper === null) {
                        this.inputDataUnit(arrUnit[u], arrData);
                    }
                }
            }
        },
        inputDataUnitCase(unit, arrDataUnit) {
            let units = [];
            for (let d in arrDataUnit) {
                let temp = {};
                for (let u in unit.case) {
                    temp[u] = {};
                    for (let i in unit.case[u]) {
                        temp[u][i] = unit.case[u][i];
                    }
                    this.inputDataUnit(temp[u], arrDataUnit[d]);
                }
                if ('SYS__edit' in temp) {
                    if (!temp.SYS__edit.value) {
                        for (let v in temp) {
                            if ('required' in temp[v]) temp[v].required = false;
                            if ('disabled' in temp[v]) temp[v].disabled = true;
                        }
                    }
                }
                units.push(temp);
            }
            this.$set(unit, 'units', units);
        },
        inputDataUnit(unit, arrData) {
            if ('case' in unit) {
                this.inputDataUnitCase(unit, arrData[unit.data]);
                return false;
            }
            //  ~~~
            if (!('data' in unit)) return false;
            //  ~~~
            let path, linkData;
            //  ~~~
            if ('data_text' in unit) {
                linkData = arrData;
                path = unit.data_text.split('.');
                for (let p in path) {
                    if (path[p] in linkData) {
                        linkData = linkData[path[p]];
                    } else {
                        linkData = undefined;
                        break;
                    }
                }
                if (typeof linkData == 'undefined') unit.data_text = '';
                else unit.data_text = linkData;
            }
            //  ~~~
            linkData = arrData;
            path = unit.data.split('.');
            for (let p in path) {
                if (path[p] in linkData) {
                    linkData = linkData[path[p]];
                } else {
                    return false;
                }
            }
            //  ~~~
            if (Array.isArray(linkData)) {
                unit.value = [];
                for (let i in linkData) {
                    unit.value.push(linkData[i]);
                }
            } else {
                unit.value = JSON.parse(JSON.stringify(linkData));
            }
            //  ~~~
            unit.data_value = linkData;
        }
    },
    template: `
        <form v-on:submit="$root.sendForm" method="post">
            <rnp-form-block-v1
                v-for="(b, i) in form.blocks"
                :index="index_calc + '.B-' + i"
                :key="index_calc + '.B-' + i"
                :block="b"
            />
            <!-- обычная отправка формы -->
            <button
                v-if="form.send"
                class="button button-medium button-red w-100 col-xs-12"
                type="submit"
            >sendForm()</button>
        </form>
    `
});


Vue.component('rnp-form-block-v1', {
    props: ['block', 'index'],
    watch: {
        'block.tab_selected': function() {
            this.checkTabSelected();
            this.$root.form.event_resize++;
        }
    },
    updated: function() {
        if ('tabs' in this.block) {
            this.checkTabSelected();
        }
    },
    methods: {
        component: function(wrapper, temp) { // !!!
            return wrapper ? wrapper : 'rnp-unit-v1';
        },
        checkTabSelected: function() {
            if (!this.block.tabs[this.block.tab_selected].visible) {
                for (let i in this.block.tabs) {
                    if (this.block.tabs[i].visible) {
                        this.block.tab_selected = i
                        break;
                    }
                }
            }
        }
    },
    template: `
        <div v-show="block.visible" :data-ref="index">

            <!--TITLE-->
            <div v-if="block.title" class="row">
                <div class="col-xs-12">
                    <h3>{{ block.title }}</h3>
                </div>
            </div>

            <!--BLOCK-->
            <template v-if="block.blocks">
                <rnp-form-block-v1
                    v-for="(b, i) in block.blocks"
                    :index="index + '.B' + i"
                    :key="index + '.B' + i"
                    :block="b"
                />
            </template>

            <!--TABS-->
            <template v-else-if="block.tabs">
                <div class="row" :data-ref="block.tabs_ref">
                    <div class="col-xs-12">
                        <ul class="tabs mb-1">
                            <template v-for="(tab, t) in block.tabs">
                                <li
                                    v-show="tab.visible && tab.button"
                                    :key="index + '.TB' + t"
                                    @click="block.tab_selected = t"
                                    :class="'tabs__item' + (block.tab_selected == t ? ' tabs__item_active' : '')"
                                >
                                    {{ tab.button }}
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
                <template v-for="(tab, t) in block.tabs">
                    <div v-show="block.tab_selected == t && tab.visible">
                        <template v-for="(b, i) in tab.blocks">
                            <rnp-form-block-v1
                                :index="index + '.T-' + t + '.B-' + i"
                                :key="index + '.T-' + t + '.B-' + i"
                                :block="b"
                            />
                        </template>
                    </div>
                </template>
            </template>

            <!--UNITS-->
            <div v-else class="row">
                <template v-for="unit in block.units">
                    <component
                        v-if="$root.units[unit].type"
                        :is="component($root.units[unit].wrapper, $root.units[unit])"
                        :unit="$root.units[unit]"
                        :key="index + '.U.' + unit"
                        :index="index + '.' + unit"
                        :data_path="$root.units[unit].data || null"
                    />
                </template>
            </div>

        </div>
    `
});


Vue.component('rnp-unit-group-v1', {
    props: ['unit', 'index', 'data', 'data_path'],
    template: `
        <div class="row row-p-0 row-pb-0">
            <template v-for="u in unit">
                <rnp-unit-v1
                    v-if="u.type"
                    :unit="u"
                    :key="index + '.' + u.data"
                    :index="index + '.' + u.data"
                    :data_path="data_path"
                />
            </template>
        </div>
    `
});


Vue.component('rnp-unit-groups-edit-v1', {
    props: ['unit', 'index', 'data_path'],
    created: function() {
        while (this.unit.units.length < this.unit.min_unit) {
            if (!this.addUnitCase()) break;
        }
        this.items = this.unit.units.length;
        this.unit.unit_ref = this.index;
    },
    beforeUpdate: function() {
        this.unit.unit_ref = this.index;
    },
    updated: function() {
        while (this.unit.units.length < this.unit.min_unit) {
            if (!this.addUnitCase()) break;
        }
        let len = this.unit.units.length;
        if (this.items < len && !this.unit.no_scroll) {
            let refs = this.index + '~' + (len - 1);
            this.$refs[refs][0].scrollIntoView({behavior: 'smooth'});
        }
        this.items = len;
    },
    watch: {
        'unit': {
            handler() {
                for (let u in this.unit.units) {
                    if (this.unit.units[u].SYS__edit_status.value == 'new') continue;
                    if (this.unit.units[u].SYS__edit_status.value == 'delete') continue;
                    let status = 'none';
                    outer: for (let i in this.unit.units[u]) {
                        if (i.indexOf('SYS__') >= 0) continue;
                        if (i in this.root.data[u]) {
                            let value;
                            let data = this.root.data[u][i];
                            //  ~~~
                            if ('value' in this.unit.units[u][i]) {
                                value = JSON.stringify(this.unit.units[u][i].value);
                                if (value != JSON.stringify(data)) {
                                    status = 'edit';
                                    break outer;
                                }
                            } else {
                                value = this.unit.units[u][i].units;
                                for (let v in value) {
                                    if (!(v in data)) {
                                        status = 'edit';
                                        break outer;
                                    }
                                    for (let uv in value[v]) {
                                        if (!(uv in data[v])) continue;
                                        if (data[v][uv] !== value[v][uv].value) {
                                            status = 'edit';
                                            break outer;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    this.unit.units[u].SYS__edit_status.value = status;
                }
            },
            deep: true
        }
    },
    computed: {
        root: function() {
            let path = this.data_path.split('.');
            let data = this.$root.data;
            let units = this.$root.units;
            for (let p of path) {
                if (data[p]) {
                    data = data[p];
                } else {
                    data = false;
                }
                if ('units' in units[p]) {
                    units = units[p].units;
                } else {
                    units = units[p];
                }
            }
            return { data, units };
        },
        totalView: function() {
            let total = 0;
            for (let i in this.unit.units) {
                if (this.unit.units[i].SYS__edit_status.value !== 'delete') total++;
            }
            return total;
        }
    },
    methods: {
        addUnitCase: function() {
            if (!this.unit.case.SYS__edit.value) return false;
            let temp = {};
            for (let u in this.unit.case) {
                temp[u] = {};
                for (let p in this.unit.case[u]) {
                    if (Array.isArray(this.unit.case[u][p])) {
                        temp[u][p] = [];
                        for (let v in this.unit.case[u][p]) {
                            temp[u][p].push(this.unit.case[u][p][v]);
                        }
                    } else {
                        temp[u][p] = this.unit.case[u][p];
                        delete temp[u]['data_text'];
                    }
                }
            }
            this.root.units.push(temp);
        },
        deleteUnitCase: function(u) {
            if (this.notDelete(u)) return false;
            if (!this.unit.case.SYS__edit.value) return false;
            if (this.unit.units.length === 1 && this.unit.min_unit != 0) return false;
            let html = `
                <h3>Подтверждение</h3>
                <p>Вы действительно хотите удалить элемент ?</p>
            `;
            RNP_modal_v1.open({
                type: 'confirm',
                content: html,
                class: 'col',
                action: {
                    positive: () => {
                        if (this.unit.units[u].SYS__edit.value) {
                            let temp = this.root.units;
                            if (temp[u].SYS__edit_status.value == 'new') temp.splice(u, 1);
                            else temp[u].SYS__edit_status.value = 'delete';
                        }
                    }
                }
            });
        },
        notDelete: function(u) {
            if ('SYS__not_delete' in this.unit.units[u]) {
                return this.unit.units[u].SYS__not_delete.value;
            } else {
                return false;
            }
        }
    },
    template: `
        <div v-if="unit.view" class="row row-p-0 row-pb-0">
            <template v-for="(units, u) in unit.units">
                <template v-if="units.SYS__edit_status.value !== 'delete'">
                    <div
                        :ref="index + '~' + u"
                        :class="unit.class"
                        class="row row-p-0 row-pb-0"
                    >
                        <div
                            v-if="!unit.no_head && (!units.SYS__edit.value || unit.units.length > 1 || unit.min_unit == 0 || units.SYS__edit_no_message.value)"
                            class="col-xs-12"
                        >
                            <h4>
                                <div class="row row-p-0 middle-xs">
                                    <div
                                        v-if="unit.units.length > 1 || unit.min_unit == 0"
                                        style="margin-right: 1rem"
                                    >
                                        <template v-if="unit.label">{{ unit.label }}</template>
                                        {{ '#' + (Number(u) + 1) }}
                                    </div>
                                    <template v-if="units.SYS__edit.value && !notDelete(u)">
                                        <button 
                                            v-if="totalView > unit.min_unit || unit.min_unit == 0"
                                            @click="deleteUnitCase(u)" 
                                            class="close"
                                            type="button"
                                            style="margin-right: 1rem"
                                        />
                                    </template>
                                    <div
                                        v-if="units.SYS__edit_no_message.value"
                                        v-html="units.SYS__edit_no_message.value"
                                        class="gray"
                                    />
                                </div>
                            </h4>
                        </div>
                        <component
                            :is="unit.type"
                            :unit="units"
                            :key="index + '-' + u"
                            :index="index + '-' + u"
                            :data="root.data[u]"
                            :data_path="data_path + '.' + u"
                            :class="{'row-pb-0': totalView == 1 && totalView >= unit.max_unit}"
                        />
                    </div>
                </template>
            </template>
            <div v-if="totalView < unit.max_unit && unit.case.SYS__edit.value" class="col-xs-12 start-sm center-xs mb-1">
                <rnp-info-slot-v1 v-if="unit.edit_info" class="mb-1">
                    <div v-html="unit.edit_info" />
                    <button
                        @click="addUnitCase()"
                        class="button button-small button-outline white"
                        style="margin-top: 1.5rem"
                        type="button"
                    >
                        {{ unit.edit_text || 'Добавить' }}
                    </button>
                </rnp-info-slot-v1>
                <button
                    v-else
                    @click="addUnitCase()"
                    class="button button-small button-outline white"
                    type="button"
                >
                    {{ unit.edit_text || 'Добавить' }}
                </button>
            </div>
        </div>
    `
});


Vue.component('rnp-unit-fias-v1', {
    props: ['unit', 'index'],
    watch: {
        'unit.units.M__AR_UID_Country.value':   function() { this.checkIndex('AR') },
        'unit.units.M__AR_Index.value':         function() { this.checkIndex('AR') },
        'unit.units.M__AF_UID_Country.value':   function() { this.checkIndex('AF') },
        'unit.units.M__AF_Index.value':         function() { this.checkIndex('AF') },

        'unit.units.M__AR_Flat.value':          function() { this.checkFlat('AR') },
        'unit.units.M__AF_Flat.value':          function() { this.checkFlat('AF') },
    },
    mounted: function() {
        this.checkIndex('AR');
        this.checkIndex('AF');
    },
    beforeUpdate: function() {
        this.checkIndex('AR');
        this.checkIndex('AF');
    },
    methods: {
        checkIndex: function(type) {
            let temp = this.unit.units['M__' + type + '_Index'];
            if (!temp) return false;
            if (!('length' in temp)) this.$set(temp, 'length', -1);
            if (!('inv_text' in temp)) this.$set(temp, 'inv_text', '');
            if (this.unit.units['M__' + type + '_UID_Country'].value == 'RU') {
                temp.value = temp.value.substr(0, 6);
                temp.length = 6;
                if (temp.value.length == 5) {
                    temp.length = 5;
                }
                temp.inv_text = `
                    Индекс должен содержать 6 цифр, или 5 цифр 
                    для территорий ЛНР, ДНР, Запорожской или 
                    Херсонской областей
                `;
            } else {
                temp.length = -1;
                temp.inv_text = '';
            }
        },
        checkFlat: function(type) {
            let temp = this.unit.units['M__' + type + '_Flat'];
            if (temp.value.indexOf('-') == 0) temp.value = '-';
            else temp.value = temp.value.replace(/[^\d]/g, '');
        }
    },
    template: `
        <div
            :class="unit.class"
            class="row row-p-0 row-pb-0"
        >
            <template v-for="u in unit.units">
                <rnp-unit-v1
                    v-if="u.type"
                    :unit="u"
                    :key="index + '.' + u.data"
                    :index="index + '.' + u.data"
                />
            </template>
        </div>
    `
});


Vue.component('rnp-unit-v1', {
    props: ['unit', 'index', 'data_path'],
    created: function() {
        this.unit.unit_ref = this.index;
    },
    beforeUpdate: function() {
        this.unit.unit_ref = this.index;
    },
    computed: {
        tooltip_class: function() {
            if (this.unit.type == 'rnp-input-checkbox-v1') return 'tooltip-checkbox';
            if (this.unit.type == 'rnp-input-textarea-v1') return 'tooltip-textarea';
            if (this.unit.type == 'rnp-select-v1' && this.real_disabled) return 'tooltip-textarea';
            if (this.unit.type == 'rnp-textarea-v1') return 'tooltip-textarea';
            return '';
        },
        tooltip_no_edit: function() {
            // доработка 21.09.2023 для страницы настроек визитки
            if (this.unit.no_disabled_tooltip) return false;
            // доработка 21.09.2023 для страницы настроек визитки
            if (this.unit.type == 'rnp-discipline-selector-v1') return false;
            if (this.unit.type == 'rnp-bar-selector-v1') return false;
            if (this.unit.type == 'rnp-accordeon-v1') return false;
            if (this.unit.type == 'rnp-input-checkbox-v1') return false;
            if (this.unit.type == 'rnp-alert-comment-v1') return false;
            if (this.unit.type == 'rnp-alert-v1') return false;
            if (this.unit.type == 'rnp-label-v1') return false;
            if (this.unit.type == 'rnp-info-v1') return false;
            return true;
        },
        empty_data: function() {
            if (Array.isArray(this.unit.value) && !this.unit.value.length) return true;
            if (this.unit.value === '' || this.unit.value === false) {
                if ('data_text' in this.unit) {
                    if (this.unit.data_text === '') return true;
                }
                else return true;
            }
            return false;
        },
        invalid_data: function() {
            if (this.real_disabled) return false;
            if (this.empty_data && this.unit.required) return true;
            if (!this.empty_data && this.unit.invalid && this.unit.invalid_view) return true;
            return false;
        },
        real_disabled: function() {
            let d = true;
            if ('data_value' in this.unit) d = this.unit.dis_em_d || this.unit.data_value.length !== 0;
            this.unit.disabled = d && this.unit.disabled;
            return this.unit.disabled;
        },
    },
    template: `
        <div v-if="unit.view" :class="unit.class" :data-ref="index">
            <div
                class="field"
                :class="{
                    'invalid': invalid_data, 
                    'disabled': real_disabled
                }"
                :title="tooltip_no_edit ? unit.label : ''"
            >

                <component
                    :is="unit.type"
                    :data="unit"
                    :key="index"
                    :index="index"
                />

                <div
                    v-if="real_disabled && tooltip_no_edit"
                    :class="tooltip_class"
                    class="tooltip-info"
                >
                    <p>Недоступно для редактирования</p>
                </div>

                <template v-else>
                    <div
                        v-if="unit.tooltip"
                        :class="tooltip_class"
                        class="tooltip-info"
                    >
                        <p v-for="text in unit.tooltip" v-html="text"></p>
                    </div>
                    <div
                        v-if="!empty_data && unit.invalid && unit.invalid_view"
                        :class="tooltip_class"
                        class="field_invalid tooltip-info"
                    >
                        <p>{{ unit.invalid }}</p>
                    </div>
                    <div
                        v-if="empty_data && unit.required"
                        :class="tooltip_class"
                        class="field_invalid tooltip-info"
                    >
                        <p>Обязательно для заполнения</p>
                    </div>
                </template>

            </div>
        </div>
    `
});


Vue.component('rnp-label-v1', {
    props: ['data', 'index'],
    template: `
        <div v-if="data.label" class="row">
            <div class="col-xs-12 mb-n1">
                <h3>{{ data.label }}</h3>
            </div>
        </div>
    `
});


Vue.component('rnp-info-gray-slot-v1', {
    props: ['index'],
    template: `
        <div class="informer bg-gray">
            <slot />
        </div>
    `
});

//  !!! класс bg-teal ВНЕ библиотеки
Vue.component('rnp-info-teal-slot-v1', {
    props: ['index'],
    template: `
        <div class="informer bg-teal">
            <slot />
        </div>
    `
});

//  !!! класс bg-burgundy ВНЕ библиотеки
Vue.component('rnp-info-burgundy-slot-v1', {
    props: ['index'],
    template: `
        <div class="informer bg-burgundy">
            <slot />
        </div>
    `
});


Vue.component('rnp-info-v1', {
    props: ['data', 'index'],
    template: `
        <div v-html="data.value" class="informer bg-blue" />
    `
});


Vue.component('rnp-info-slot-v1', {
    props: ['index'],
    template: `
        <div class="informer bg-blue">
            <slot />
        </div>
    `
});


Vue.component('rnp-alert-v1', {
    props: ['data', 'index'],
    template: `
        <div v-html="data.value" class="informer panel-list bg-peach" />
    `
});


Vue.component('rnp-alert-comment-v1', {
    props: ['data', 'index'],
    template: `
        <div class="informer panel-list bg-peach">
            <h4>КОММЕНТАРИЙ</h4>
            <div v-html="data.value" />
        </div>
    `
});


Vue.component('rnp-alert-slot-v1', {
    props: ['index'],
    template: `
        <div class="informer panel-list bg-peach">
            <slot />
        </div>
    `
});


Vue.component('rnp-data-block-slot-v1', {
    props: ['index'],
    template: `
        <div class="informer bg-beige">
            <slot />
        </div>
    `
});


Vue.component('rnp-accordeon-v1', {
    props: ['data', 'index'],
    template: `
        <div
            :key="index"
            :class="{'accordion__item_expanded': data.visible}"
            class="accordion__item form-element bg-blue"
            style="width: revert"
        >
            <p
                @click="data.visible = !data.visible"
                v-html="data.label"
                class="accordion__title"
            />
            <div class="accordion__content panel-list">
                <div v-html="data.value" />
            </div>
        </div>
    `
});


Vue.component('rnp-accordeon-slot-v1', {
    props: ['data', 'index'],
    template: `
        <div
            :key="index"
            :class="{'accordion__item_expanded': data.visible}"
            class="accordion__item form-element bg-blue"
            style="width: revert"
        >
            <p
                @click="data.visible = !data.visible"
                v-html="data.label"
                class="accordion__title"
            />
            <div class="accordion__content panel-list">
                <div>
                    <slot />
                </div>
            </div>
        </div>
    `
});


Vue.component('rnp-input-text-v1', {
    props: ['data', 'index'],
    data: function() {
        return {
            focused: false
        }
    },
    watch: {
        'data.value':   function() { this.input(); }
    },
    mounted: function() {
        this.input();
    },
    methods: {
        focus: function(type, event) {
            this.$emit(type, event);
            if (type === 'focusin') {
                this.focused = true;
                this.data.invalid_view = false;
            }
            else {
                this.focused = false;
                this.data.invalid_view = true;
            }
        },
        input: function() {
            let temp = this.data;
            if ('dash' in temp) {
                if (temp.dash) {
                    if (temp.value.indexOf('-') == 0) {
                        temp.value = '-';
                        return true;
                    }
                }
            }
            if ('reg' in temp) {
                temp.value = temp.value.replace(RNP_APP_v1.reg[temp.reg], '');
            }
            if ('format' in temp) {
                if (temp.value.length) {
                    if (temp.format == 'Ss **') {
                        let arr = temp.value.split(' ');
                        arr[0] = arr[0][0].toUpperCase() + arr[0].slice(1).toLowerCase();
                        temp.value = arr.join(' ');
                    }
                    if (temp.format == 'Ss Ss') {
                        let arr = temp.value.split(' ');
                        for (let i in arr) {
                            if (arr[i].length) {
                                arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1).toLowerCase();
                            }
                        }
                        temp.value = arr.join(' ');
                    }
                }
            }
        }
    },
    template: `
        <div>
            <input
                @focusin="focus('focusin', $event)"
                @focusout="focus('focusout', $event)"
                v-model.trim="data.value"
                :disabled="data.disabled"
                :placeholder="data.placeholder || ' '"
                :name="data.name"
                :id="index"
                type="text"
                autocomplete="off"
            />
            <label :for="index">{{ data.label }}</label>
        </div>
    `
});


Vue.component('rnp-input-search-v1', {
    props: ['data', 'index'],
    methods: {
        keydown: function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
            }
        }
    },
    template: `
        <div class="search-input-vue">
            <input
                v-model.trim="data.value"
                :class="{'invalid': data.value}"
                class="search-input-vue"
                placeholder="Поиск"
                type="text"
                autocomplete="off"
                @keydown="keydown($event)"
            />
            <ins
                v-if="data.value"
                @click="data.value = ''"
            />
        </div>
    `
});


Vue.component('rnp-input-textarea-v1', {
    props: ['data', 'index'],
    data: function() {
        return {
            focused: false,
            rows: this.data.rows || 1
        }
    },
    watch: {
        '$root.form.event_resize':  function() { this.input(); }
    },
    mounted: function() {
        this.input();
    },
    methods: {
        keypress: function(event) {
            if (!('rows' in this.data)) {
                if (event.which == 13) event.preventDefault();
            }
        },
        input: function(event) {
            let temp = this.data;
            if ('dash' in temp) {
                if (temp.dash) {
                    if (temp.value.indexOf('-') == 0) {
                        temp.value = '-';
                        this.autoSize();
                        return true;
                    }
                }
            }
            if (temp.value.length) {
                if (!('rows' in this.data)) {
                    temp.value = temp.value.replace("\n\r", ' ');
                    temp.value = temp.value.replace("\r\n", ' ');
                    temp.value = temp.value.replace("\r", ' ');
                    temp.value = temp.value.replace("\n", ' ');
                }
                if ('format' in temp) {
                    if (temp.format == 'Ss **') {
                        let arr = temp.value.split(' ');
                        arr[0] = arr[0][0].toUpperCase() + arr[0].slice(1).toLowerCase();
                        temp.value = arr.join(' ');
                    }
                    if (temp.format == 'Ss Ss') {
                        let arr = temp.value.split(' ');
                        for (let i in arr) {
                            if (arr[i].length) {
                                arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1).toLowerCase();
                            }
                        }
                        temp.value = arr.join(' ');
                    }
                    if (temp.format == '/-') {
                        let str = temp.value.trim();
                        while (str[0] == '-') str = str.slice(1)
                        temp.value = str;
                    }
                }
            }
            this.autoSize();
        },
        focus: function(type, event) {
            this.$emit(type, event);
            if (type === 'focusin') {
                this.focused = true;
                this.data.invalid_view = false;
            }
            else {
                this.focused = false;
                this.data.invalid_view = true;
                this.input();
            }
        },
        autoSize: function() {
            this.$refs['this'].style.height = '1rem';
            this.rows = Math.ceil((parseInt(this.$refs['this'].scrollHeight) - 38) / 32);
            if (this.rows === 0) this.rows = 1;
            if ('rows' in this.data) {
                this.$refs['this'].removeAttribute('style');
                if (this.rows < this.data.rows) this.rows = this.data.rows;
            } else {
                this.$refs['this'].style.height = 'auto';
            }
        }
    },
    template: `
        <div>
            <textarea
                @keypress="keypress($event)"
                @input="input()"
                @focusin="focus('focusin', $event)"
                @focusout="focus('focusout', $event)"
                v-model.trim="data.value"
                :disabled="data.disabled"
                :placeholder="data.placeholder || ' '"
                :name="data.name"
                :id="index"
                :rows="rows"
                ref="this"
            />
            <label :for="index">{{ data.label }}</label>
        </div>

    `
});


Vue.component('rnp-input-phone-v1', {
    props: ['data', 'index'],
    watch: {
        'data.value': function() {
            this.validData();
        }
    },
    mounted: function() {
        this.validData();
    },
    methods: {
        validData: function() {
            this.data.value = this.data.value.replace(/[^\d]/g, '').substr(0, 18);
            if (this.data.value !== '') {
                if (this.data.value[0] != "+") this.data.value = "+" + this.data.value;
            }
        }
    },
    template: `
        <rnp-input-text-v1
            :data="data"
            :key="index"
            :index="index"
        />
    `
});


Vue.component('rnp-input-email-v1', {
    props: ['data', 'index'],
    data: function() {
        return {
            max_len: 256,
            focused: false
        }
    },
    watch: {
        'data.value':   function() { this.validData(); },
        'focused':      function() { this.invalidData(); }
    },
    beforeMount: function() {
        this.validData();
    },
    methods: {
        validData: function() {
            this.data.value = this.data.value.substr(0, this.max_len);
            this.invalidData();
        },
        invalidData: function() {
            let reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
            if (!reg.test(this.data.value) && !this.focused) {
                this.data.invalid = 'Адрес указан некорректно';
            } else {
                this.data.invalid = '';
            }
        }
    },
    template: `
        <rnp-input-text-v1
            @focusin="focused = true"
            @focusout="focused = false"
            :data="data"
            :key="index"
            :index="index"
        />
    `
});


Vue.component('rnp-input-snils-v1', {
    props: ['data', 'index'],
    data: function() {
        return {
            focused: false
        }
    },
    watch: {
        'data.value':   function() { this.validData(); },
        'focused':      function() { this.validData(); }
    },
    beforeMount: function() {
        this.validData();
    },
    methods: {
        validData: function() {
            let data = this.data.value.replace(/[^\d]/g, '').substr(0, 11).split('');

            if (data.length !== 11) {
                this.data.invalid = 'СНИЛС указан некорректно';
            }
            else {
                let check = [9,8,7,6,5,4,3,2,1];
                let sum = 0;
                let control = parseInt(data[9] + data[10]);
                for (let c in check) sum += check[c] * parseInt(data[c]);
                while (sum > 100) sum %= 101
                if (sum == 100) sum = 0;
                if (control === sum) this.data.invalid = '';
                else this.data.invalid = 'СНИЛС указан некорректно';
            }
            
            let temp = [];
            while (data.length > 0) temp.push(data.splice(0, 3));
            for (let i in temp) temp[i] = temp[i].join('');
            temp = temp.join('-');
            let a = temp.substr(0, 11);
            let b = temp.substr(12);
            this.data.value = a + (b ? ' ' : '') + b;
        }
    },
    template: `
        <rnp-input-text-v1
            @focusin="focused = true"
            @focusout="focused = false"
            :data="data"
            :key="index"
            :index="index"
        />
    `
});


Vue.component('rnp-input-digital-v1', {
    props: ['data', 'index'],
    data: function() {
        return {
            focused: false
        }
    },
    watch: {
        'data.length':  function() { this.validData(); },
        'data.value':   function() { this.validData(); },
        'focused':      function() { this.invalidData(); }
    },
    beforeMount: function() {
        this.validData();
    },
    beforeUpdate: function() {
        this.validData();
    },
    methods: {
        validData: function() {
            this.data.value = this.data.value.replace(/[^\d]/g, '');
            if (this.data.length != -1) {
                this.data.value = this.data.value.substr(0, this.data.length);
            }
            if ('default' in this.data) {
                if (this.data.value) {
                    if (this.data.default.indexOf(this.data.value) < 0) {
                        this.data.value = '';
                    }
                }
            }
            this.invalidData();
        },
        invalidData: function() {
            if (this.data.length != -1 && this.data.value.length !== this.data.length && !this.focused) {
                this.data.invalid = this.data.inv_text;
            } else {
                this.data.invalid = '';
            }
        }
    },
    template: `
        <rnp-input-text-v1
            @focusin="focused = true"
            @focusout="focused = false"
            :data="data"
            :key="index"
            :index="index"
        />
    `
});


Vue.component('rnp-textarea-v1', {
    props: ['data', 'index'],
    template: `
        <div>
            <textarea 
                v-model.trim="data.value"
                :disabled="data.disabled"
                :placeholder="data.placeholder || ' '"
                :name="data.name"
                :id="index"
                rows="5"
            />
            <label :for="index">{{ data.label }}</label>
        </div>
    `
});


Vue.component('rnp-input-date-v1', {
    props: ['data', 'index'],
    watch: {
        'data.value':   function() { this.validData(); }
    },
    beforeMount: function() {
        this.validData();
    },
    beforeUpdate: function() {
        this.validData();
    },
    methods: {
        validData: function() {
            let temp = this.data.value.split('-');
            if (temp[0].length > 4) {
                temp[0] = temp[0].substr(0, 4);
                this.data.value = temp.join('-');
            }
            this.data.invalid = '';
            if ('max' in this.data) {
                if (this.data.value > this.data.max) {
                    this.data.invalid = 'Дата указана некорректно';
                }
            }
            if ('min' in this.data) {
                if (this.data.value < this.data.min) {
                    this.data.invalid = 'Дата указана некорректно';
                }
            }
        }
    },
    template: `
        <div>
            <input
                v-model.trim="data.value"
                :disabled="data.disabled"
                :style="(data.disabled && !data.value) ? 'color: rgba(0,0,0,.3)' : ''"
                :placeholder="data.placeholder || ' '"
                :name="data.name"
                :id="index"
                :max="data.max || ''"
                :min="data.min || ''"
                type="date"
                style="height: 4.5rem"
                autocomplete="off"
            />
            <label :for="index">{{ data.label }}</label>
        </div>
    `
});


Vue.component('rnp-input-date-year-v1', {
    props: ['data', 'index'],
    data: function() {
        return {
            focused: false,
            max_len: 4
        }
    },
    watch: {
        'data.inv_text':    function() { this.validData(); },
        'data.value':       function() { this.validData(); },
        'data.min':         function() { this.validData(); },
        'data.max':         function() { this.validData(); },
        'focused':          function() { this.invalidData(); }
    },
    beforeMount: function() {
        this.validData();
    },
    beforeUpdate: function() {
        this.validData();
    },
    methods: {
        validData: function() {
            this.data.value = this.data.value.replace(/[^\d]/g, '');
            this.data.value = this.data.value.substr(0, this.max_len);
            this.invalidData();
        },
        invalidData: function() {
            this.data.invalid = '';
            if (this.focused) return false;
            let value = parseInt(this.data.value);
            if (this.data.value.length < this.max_len) {
                this.data.invalid = 'Год должен содержать 4 цифры';
            } else if (this.data.min && value < this.data.min) {
                this.data.invalid = this.data.inv_text || 'Год должен быть не меньше ' + this.data.min;
            } else if (this.data.max && value > this.data.max) {
                this.data.invalid = this.data.inv_text || 'Год должен быть не больше ' + this.data.max;
            } else if (this.data.inv_text) {
                this.data.invalid = this.data.inv_text;
            }
        }
    },
    template: `
        <rnp-input-text-v1
            @focusin="focused = true"
            @focusout="focused = false"
            :data="data"
            :key="index"
            :index="index"
        />
    `
});


Vue.component('rnp-input-checkbox-v1', {
    props: ['data', 'index'],
    beforeMount: function() {
        this.validData();
    },
    beforeUpdate: function() {
        this.validData();
    },
    methods: {
        validData: function() {
            if (this.data.value !== true) {
                this.data.value = false;
            }
        }
    },
    template: `
        <div>
            <div class="option">
                <input
                    v-model="data.value"
                    :disabled="data.disabled"
                    :id="index"
                    type="checkbox"
                    value=""
                    autocomplete="off"
                />
                <label
                    :for="index"
                    v-html="data.label" 
                    style="width: fit-content"
                />
            </div>
        </div>
    `
});


Vue.component('rnp-file-repo-v1', {
    props: ['data', 'index'],
    data: function() {
        return {
            upload: false
        };
    },
    methods: {
        changeFile(event) {
            let file = event.target.files[0];
            event.target.value = '';
            if ('file_all' in this.data && this.data.file_all < this.data.value.length) return false;
            //  ~~~
            let html = false;
            if (this.iconFile(file.name) == 'nan') {
                html = '<h3>Внимание</h3><p>Выбранный файл не соответствует требуемым форматам</p>';
            }
            if (file.size > this.data.file_size) {
                html = '<h3>Внимание</h3><p>Размер файла превышает заданный лимит</p>';
            }
            if (html) {
                RNP_modal_v1.open({
                    type: 'alert',
                    content: html,
                    class: 'col',
                });
                return false;
            }
            //  ~~~
            this.upload = true;
            let form = new FormData();
            form.append('Key', this.$root.form.param.repo.key);
            form.append('Creator', '');
            form.append('Publisher', '');
            form.append('file', file, file.name);
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.$root.form.param.repo.link);
            //  ~~~
            xhr.onload = () => {
                setTimeout(() => {
                    if (xhr.status == '201') {
                        let temp = JSON.parse(xhr.response);
                        temp = {
                            'Link': temp.DC.Relation,
                            'Type': 'repo',
                            'Title': temp.DC.Title,
                            'Size': temp.DC.size
                        };
                        this.data.value.push(temp);
                    }
                    this.upload = false;
                }, 1111);
            }
            xhr.send(form);
        },
        deleteFile: function(i) {
            if (this.data.disabled) return false;
            let html = `
                <h3>Подтверждение</h3>
                <p>Вы действительно хотите удалить файл ?</p>
            `;
            RNP_modal_v1.open({
                type: 'confirm',
                content: html,
                class: 'col',
                action: {
                    positive: () => {
                        this.data.value.splice(i, 1);
                    }
                }
            });
        },
        iconFile: function(name) {
            name = name.split('.').pop();
            for (let i in this.data.file_type) {
                if (this.data.file_type[i].indexOf(name) >= 0) {
                    return i.split('/')[1];
                }
            }
            return 'nan';
        },
        linkFile: function(e) {
            return document.location.origin + '/_link.php?' + e + '&trudno=' + (e * 123);
        },
        sizeFile: function(size) {
            size = parseInt(size);
            if (size < 1024) return size + ' Б';
            size = Math.ceil(size / 1024);
            if (size < 1024) return size + ' KБ';
            size = Math.ceil(size / 1024);
            if (size < 1024) return size + ' МБ';
        },
        listFile: function() {
            let temp = [];
            for (let i in this.data.file_type) {
                temp.push(i);
            }
            return temp.join(', ');
        }
    },
    template: `
        <div class="input-file">
            <div class="label">{{ data.label }}</div>
            <template>
                <div v-if="data.value.length" class="file picker">
                    <ins class="selected-vue">
                        <ins
                            v-for="(value, i) in data.value"
                            :class="iconFile(value.Title)"
                            :key="i"
                            class="file image all"
                        >
                            <ins class="name">{{ value.Title }}</ins>
                            <ins class="size">
                                <div>{{ sizeFile(value.Size) }}</div>
                                <div>
                                    <a :href="linkFile(value.Link)" class="link link-red" target="_blank">
                                        Посмотреть
                                    </a>
                                    &#160;&#160;
                                    <a v-if="!data.disabled" class="link link-red" @click="deleteFile(i)">
                                        Удалить
                                    </a>
                                </div>
                            </ins>
                        </ins>
                    </ins>
                </div>
                <div v-if="!data.file_all || data.file_all > data.value.length">
                    <label v-if="upload" class="disabled">Загрузка файла...</label>
                    <label
                        v-else
                        :class="data.disabled ? 'disabled' : 'add'"
                        :for="'files' + index"
                    ><template v-if="!data.disabled">📁</template> Добавить файл</label>
                    <input 
                        :id="'files' + index"
                        :name="data.name + index"
                        :disabled="data.disabled"
                        :accept="listFile()"
                        @change="changeFile"
                        type="file"
                        autocomplete="off"
                    />
                </div>
            </template>
        </div>
    `
});


Vue.component('rnp-select-v1', {
    props: ['data', 'index'],
    data: function() {
        return {
            open: false,
            search_need: this.isSearch(this.$root.refs[this.data.refs]),
            search_word: ''
        }
    },
    created: function() {
        this.unit_disabled = {};
        for (let i in this.data) {
            this.unit_disabled[i] = this.data[i];
        }
        this.unit_disabled.disabled = true;
    },
    computed: {
        real_data: function() {
            if ('list' in this.data) {
                if (this.data.list !== false) {
                    if (this.data.value in this.data.list) {
                        return this.data.list[this.data.value];
                    } else {
                        if ('data_text' in this.data) {
                            return this.data.data_text;
                        } else {
                            return '';
                        }
                    }
                }
            }
            if (!(this.data.refs in this.$root.refs)) {
                console.info('💥 Cправочник ' + this.data.refs + ' отсутствует');
                return '💥 Справочник ' + this.data.refs + ' отсутствует';
            }
            if (this.data.value in this.$root.refs[this.data.refs]) {
                return this.$root.refs[this.data.refs][this.data.value];
            }
            if ('data_text' in this.data) {
                return this.data.data_text;
            }
            return '';
        },
        real_ref: function() {
            if (this.search_word == '') {
                return this.getRefs();
            } else {
                let res = {};
                let list = this.getRefs();
                for (let i in list) {
                    if (list[i].toUpperCase().indexOf(this.search_word.toUpperCase()) < 0) continue;
                    res[i] = list[i];
                }
                return res;
            }
        },
        disabled: function() {
            if (this.data.disabled) {
                this.unit_disabled.value = this.real_data;
                return true;
            } else {
                return false;
            }
        }
    },
    watch: {
        'open': function() {
            if (this.open) {
                window.addEventListener('click', e => this.close(e));
            } else {
                window.removeEventListener('click', e => this.close(e));
            }
        }
    },
    methods: {
        getRefs: function() {
            let res = false;
            if ('list' in this.data) {
                if (this.data.list !== false) {
                    res = this.data.list;    
                }
            }
            if (res === false) {
                res = this.$root.refs[this.data.refs];
            }
            if (!res) return {};
            this.search_need =  this.isSearch(res);
            if (!this.search_need) {
                this.search_word = '';
            }
            if (!(this.data.value in res)) {
                this.data.value = '';
            }
            if (this.data.value == '' && 'data_text' in this.data) {
                if (this.data.data_text) {
                    let t = 0;
                    for (let i in res) {
                        if (this.data.data_text == res[i]) {
                            this.data.value = i;
                            t++;
                        }
                    }
                    if (t > 1) this.data.value = '';
                }
            }
            return res;
        },
        isSearch: function(refs) {
            if (!refs) return false;
            return Object.keys(refs).length > 13 ? true : false
        },
        toggle: function(e) {
            if (e.target.closest('.search-input-vue')) {
                return false;
            }
            if (!e.target.classList.contains('selectors-vue')) {
                this.open = !this.open;
            }
        },
        close: function(e) {
            let parent = e.target.closest('.selectus-vue');
            if (parent) {
                if (parent.getAttribute('data-name') == this.index) {
                    return false;
                }
            }
            this.open = false;
        }
    },
    beforeDestroy: function() {
        window.removeEventListener('click', e => this.close(e));
    },
    template: `
        <div>
            <rnp-input-textarea-v1
                v-if="disabled"
                :data="unit_disabled"
                :key="index + '~disabled'"
                :index="index"
            />
            <div
                v-else
                @click="toggle"
                :class="{'focus': open, 'unselected-vue': !real_data}"
                :data-name="index"
                :key="index"
                class="selectus-vue"
            >
                <div class="select-vue">
                    <label>{{ data.label }}</label>
                    <ins>{{ real_data }}</ins>
                </div>
                <div :class="{'hidden': !open }" class="selectors-vue">
                    <div v-if="search_need" class="search-input-vue col-xs-12">
                        <input
                            v-model="search_word"
                            :class="{'invalid': search_word}"
                            class="search-input-vue"
                            placeholder="Поиск"
                            type="text"
                            autocomplete="off"
                        >
                    </div>
                    <div v-if="Object.keys(real_ref).length">

                        <template v-if="(data.filter && Object.keys(real_ref).length < data.filter) || (!data.filter && Object.keys(real_ref).length < 1000)">

                            <div
                                v-for="(item, i) in real_ref"
                                :key="i"
                                @click="data.value = i"
                                :class="{'selected-vue': data.value == i}"
                                class="option radio"
                            >
                                <label>{{ item }}</label>
                            </div>

                        </template>

                        <div v-else class="option radio">
                            Список слишком большой. Воспользуйтесь поиском<br />
                            <span class="gray">Элементов {{ Object.keys(real_ref).length }}</span>
                        </div>

                    </div>
                    <div v-else-if="search_need">
                        <div class="option radio">
                            По заданному поиску ничего не найдено
                        </div>
                    </div>
                    <div v-else>
                        <div
                            v-html="data.refs_null || 'Ничего нет :-('"
                            class="option radio"
                        />
                    </div>
                </div>
            </div>
        </div>
    `
});


Vue.component('rnp-pagination-v1', {
    props: ['pagination'],
    computed: {
        button: function() {
            let temp = [1];
            let i, start, end;
            if (this.pagination.page > this.pagination.total) {
                this.pagination.page = this.pagination.total;
            }

            if (this.pagination.total <= 7) {
                start = 2;
                end = this.pagination.total - 1;
            } else if (4 - this.pagination.page >= 0) {
                start = 2;
                end = this.pagination.page + 4;
                if (end > 5) end = 5;
            } else {
                temp.push('◄◄');
                start = this.pagination.page - 1;
                end = this.pagination.page + 1;
                if (this.pagination.total - 4 <= start) {
                    start = this.pagination.total - 4;
                    end = this.pagination.total;
                }
            }

            for (i = start; i <= end; i++) {
                if (i > this.pagination.total) break;
                temp.push(i);
            }

            if (this.pagination.total > end) {
                temp.push('►►');
                temp.push(this.pagination.total);
            }

            let res = {
                page: [],
                select: false
            };

            for (let i in temp) {
                if (temp[i] == '◄◄' || temp[i] == '►►') {
                    if (temp[i - 1] == (temp[parseInt(i) + 1] - 1)) continue;
                    else res.select = true;
                }
                res.page.push(temp[i]);
            }
            return res;
        }
    },
    template: `
        <div v-if="pagination.total > 1" class="pagination">
            <ul class="tabs">
                <template v-for="p in button.page">
                    <li v-if="p == '◄◄' || p == '►►'" class="pagination-point pagination-dotter">{{ p }}</li>
                    <li
                        v-else
                        @click="pagination.page = p"
                        :class="{ tabs__item_active: pagination.page == p }"
                        class="tabs__item pagination-point"
                    >
                        {{ p }}
                    </li>
                </template>
            </ul>
        </div>

    `
});


Vue.component('rnp-unit-filters-v1', {
    props: ['data', 'index'],
    created: function() {
        this.$set(this.data, 'shadow_open', false);
        //  ~~~
        if (!('mobile' in this.data)) {
            let mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i;
            this.$set(this.data, 'mobile', mobile.test(navigator.userAgent));
        }
        //  ~~~
        if (!('change' in this.data)) this.$set(this.data, 'change', 0);
        //  ~~~
        for (let f in this.data.filters) {
            if (!('mobile' in this.data.filters[f])) this.$set(this.data.filters[f], 'mobile', this.data.mobile);
            if (!('short' in this.data.filters[f])) this.$set(this.data.filters[f], 'short', false);
            if (!('shadow' in this.data.filters[f])) this.$set(this.data.filters[f], 'shadow', false);
            if (!('list' in this.data.filters[f])) this.$set(this.data.filters[f], 'list', false);
            if (!('refs_null' in this.data.filters[f])) this.$set(this.data.filters[f], 'refs_null', '');
            if (!('view' in this.data.filters[f])) this.$set(this.data.filters[f], 'view', true);
        }
    },
    watch: {
        'data.mobile':          function() { this.checkMobile() },
        'data.shadow_open':     function() { this.toggleShadow() }
    },
    computed: {
        shadow: function() {
            if (this.data.mobile) {
                for (let f in this.data.filters) {
                    if (this.data.filters[f].shadow) {
                        if (Object.keys(this.data.filters[f]).length) {
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        shadow_only: function() {
            if (this.data.mobile) {
                for (let f in this.data.filters) {
                    if (!this.data.filters[f].shadow) return false;
                }
            }
            return true;
        },
        shadow_selected_count: function() {
            let count = 0;
            if (this.data.mobile) {
                for (let f in this.data.filters) {
                    if (this.data.filters[f].shadow) {
                        count += this.data.value[this.data.filters[f].data].length;
                    }
                }
            }
            return count;
        }
    },
    methods: {
        toggleShadow: function() {
            if (this.data.shadow_open) {
                if (this.data.mobile) {
                    this.body_overflow = document.body.style.overflow;
                    document.body.style.overflow = 'hidden';
                }
            } else {
                if (this.data.mobile) {
                    document.body.style.overflow = this.body_overflow;
                }
            }
        },
        checkMobile: function() {
            for (let f in this.data.filters) {
                this.data.filters[f].mobile = this.data.mobile;
            }
        }
    },
    template: `
        <div>

            <!-- ◈◈◈◈◈ ВЫВОД ФИЛЬТРОВ ◈◈◈◈◈ -->
                <template v-for="(unit, i) in data.filters">
                    <template v-if="unit.view">
                        <component
                            :is="unit.type || 'rnp-filter-v1'"
                            v-if="!unit.mobile || (unit.mobile && !unit.shadow)"
                            :data="unit"
                            :key="index + '.' + i"
                            :index="index + '.' + i"
                        />
                    </template>
                </template>
            <!-- ◈◈◈◈◈ ВЫВОД ФИЛЬТРОВ ◈◈◈◈◈ -->

            <!-- ◈◈◈◈◈ ПАНЕЛЬ ДЛЯ СКРЫТЫХ ФИЛЬТРОВ ◈◈◈◈◈ -->
                <div
                    v-if="data.mobile && shadow"
                    class="selectus-vue filter"
                >

                    <!-- ◈◈◈◈◈ КНОПКА ДРУГИЕ ◈◈◈◈◈ -->
                        <div @click="data.shadow_open = true" class="field_control">
                            <div class="select-filter-vue">
                                <ins class="title other-filter">
                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="height: 2rem">
                                        <g fill="#af2127">
                                            <path d="M28,9H11a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z"/>
                                            <path d="M7,9H4A1,1,0,0,1,4,7H7A1,1,0,0,1,7,9Z"/>
                                            <path d="M21,17H4a1,1,0,0,1,0-2H21a1,1,0,0,1,0,2Z"/>
                                            <path d="M11,25H4a1,1,0,0,1,0-2h7a1,1,0,0,1,0,2Z"/>
                                            <path d="M9,11a3,3,0,1,1,3-3A3,3,0,0,1,9,11ZM9,7a1,1,0,1,0,1,1A1,1,0,0,0,9,7Z"/>
                                            <path d="M23,19a3,3,0,1,1,3-3A3,3,0,0,1,23,19Zm0-4a1,1,0,1,0,1,1A1,1,0,0,0,23,15Z"/>
                                            <path d="M13,27a3,3,0,1,1,3-3A3,3,0,0,1,13,27Zm0-4a1,1,0,1,0,1,1A1,1,0,0,0,13,23Z"/>
                                            <path d="M28,17H25a1,1,0,0,1,0-2h3a1,1,0,0,1,0,2Z"/>
                                            <path d="M28,25H15a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z"/>
                                        </g>
                                        <g>
                                            <rect class="cls-1" height="32" width="32" fill="none"/>
                                        </g>
                                    </svg>
                                    <span v-if="shadow_only">&nbsp;Фильтры</span>
                                    <span v-else>&nbsp;Другие фильтры</span>
                                    <strong v-if="shadow_selected_count" class="red">
                                        &nbsp;+{{ shadow_selected_count }}
                                    </strong>
                                </ins>
                            </div>
                        </div>
                    <!-- ◈◈◈◈◈ КНОПКА ДРУГИЕ ◈◈◈◈◈ -->

                    <!-- ◈◈◈◈◈ ПАНЕЛЬ СКРЫТЫХ ФИЛЬТРОВ ◈◈◈◈◈ -->
                        <div v-if="data.shadow_open" class="selectors-vue mobile">
                            <h3 style="margin: 0 0 1rem">Фильтры</h3>

                            <!-- ◈◈◈◈◈ КНОПКИ ФИЛЬТРОВ ◈◈◈◈◈ -->
                                <div class="reducer mobile mb-1">
                                    <template v-for="(unit, i) in data.filters">
                                        <component
                                            :is="unit.type || 'rnp-filter-v1'"
                                            v-if="unit.view && unit.shadow"
                                            :data="unit"
                                            :key="index + '.' + i"
                                            :index="index + '.' + i"
                                        />
                                    </template>
                                </div>
                            <!-- ◈◈◈◈◈ КНОПКИ ФИЛЬТРОВ ◈◈◈◈◈ -->
                            
                            <!-- ◈◈◈◈◈ КНОПКА ЗАКРЫТЬ ◈◈◈◈◈ -->
                                <div class="center-xs">
                                    <button
                                        @click="data.shadow_open = false"
                                        class="button button-small button-red"
                                        type="button"
                                    >Закрыть</button>
                                </div>
                            <!-- ◈◈◈◈◈ КНОПКА ЗАКРЫТЬ ◈◈◈◈◈ -->

                        </div>
                    <!-- ◈◈◈◈◈ ПАНЕЛЬ СКРЫТЫХ ФИЛЬТРОВ ◈◈◈◈◈ -->

                </div>
            <!-- ◈◈◈◈◈ ПАНЕЛЬ ДЛЯ СКРЫТЫХ ФИЛЬТРОВ ◈◈◈◈◈ -->

        </div>
    `
});


Vue.component('rnp-filter-v1', {
    props: ['data', 'index'],
    data: function() {
        return {
            open: false,
            search_word: ''
        }
    },
    watch: {
        'data.list':    function() { this.refs_src },
        'open':         function() { this.changeOpen() }
    },
    computed: {
        refs_src: function() {
            let res = false;
            //  ~~~
            if ('list' in this.data) {
                if (this.data.list !== false) {
                    res = this.data.list;    
                }
            }
            if (res === false) {
                res = this.$root.refs[this.data.refs];
            }
            //  ~~~
            let new_data = [];
            for (let v in this.$parent.data.value[this.data.data]) {
                if (this.$parent.data.value[this.data.data][v] in res) {
                    new_data.push(this.$parent.data.value[this.data.data][v]);
                }
            }
            this.$parent.data.value[this.data.data] = new_data;
            //  ~~~
            return res;
        },
        refs_real: function() {
            if (this.search_word == '') {
                return this.refs_src;
            } else {
                let res = {};
                for (let i in this.refs_src) {
                    if (this.$root.refs[this.data.refs][i].toUpperCase().indexOf(this.search_word.toUpperCase()) < 0) continue;
                    res[i] = this.$root.refs[this.data.refs][i];
                }
                return res;
            }
        },
        refs_src_len: function() {
            return Object.keys(this.refs_src).length;
        },
        refs_real_len: function() {
            return Object.keys(this.refs_real).length;
        },
        search_need: function() {
            if (this.refs_src_len > 11) {
                this.search_word = '';
                return true;
            }
            return false;
        },
        value: function() {
            return this.$parent.data.value[this.data.data];
        }
    },
    methods: {
        toggle: function(e) {
            this.open = !this.open;
        },
        changeOpen: function() {
            if (this.open) {
                window.addEventListener('click', e => this.close(e));
                if (this.data.mobile) {
                    this.body_overflow = document.body.style.overflow;
                    document.body.style.overflow = 'hidden';
                }
            } else {
                window.removeEventListener('click', e => this.close(e));
                if (this.data.mobile) {
                    document.body.style.overflow = this.body_overflow;
                }
            }
        },
        close: function(e) {
            let parent = e.target.closest('.selectus-vue');
            if (parent) {
                if (parent.getAttribute('data-name') === this.index) {
                    if (e.target.closest('.select-filter-vue')) {
                        if (e.target.classList.contains('title')) return false;
                        if (e.target.classList.contains('selected-vue')) return false;
                    }
                    if (e.target.closest('.selectors-vue')) return false;
                }
            }
            this.open = false;
        },
        changeFilter: function(filter) {
            let index = this.value.indexOf(filter);
            if (index < 0) {
                this.value.push(filter);
            } else {
                this.value.splice(index, 1);
            }
            if (++this.$parent.data.change > 999999) {
                this.$parent.data.change = 1;
            }
        },
        isFilterChanged: function(filter) {
            if (this.value.indexOf(filter) < 0) {
                return false;
            }
            return true;
        }
    },
    beforeDestroy: function() {
        window.removeEventListener('click', e => this.close(e));
    },
    template: `
        <div
            :class="{'focus': open, 'change': !data.short && value.length}"
            :data-name="index"
            class="selectus-vue filter"
        >
            <div class="field_control">       
                <div class="select-filter-vue">
                    <div style="display: flex">
                        <!-- ◈◈◈◈◈ КНОПКА ◈◈◈◈◈ -->
                            <ins
                                @click="toggle"
                                :title="data.label"
                                class="title"
                            >
                                {{ data.label }}
                                <strong
                                    v-if="data.short && value.length"
                                    class="red"
                                >
                                    +{{ value.length }}
                                </strong>
                            </ins>
                        <!-- ◈◈◈◈◈ КНОПКА ◈◈◈◈◈ -->
                        <!-- ◈◈◈◈◈ ПОДСКАЗКА ◈◈◈◈◈ -->
                            <rnp-mrnc-tooltip-v1
                                v-if="data.tooltip"
                                :data="data.tooltip"
                                :index="index + '.' + 'TT-' + data.data"
                            />
                        <!-- ◈◈◈◈◈ ПОДСКАЗКА ◈◈◈◈◈ -->
                    </div>
                    <!-- ◈◈◈◈◈ ДЛИННЫЙ ВЫВОД ◈◈◈◈◈ -->
                        <template v-if="!data.short && value.length">
                            <ins
                                v-for="i in value"
                                @click="toggle"
                                class="selected-vue"
                            >
                                {{ refs_real[i] }}
                                <label @click.stop="changeFilter(i)" class="unselect-vue" />
                            </ins>
                        </template>
                    <!-- ◈◈◈◈◈ ДЛИННЫЙ ВЫВОД ◈◈◈◈◈ -->
                </div>
                <!-- ◈◈◈◈◈ ПАНЕЛЬ ФИЛЬТРА ◈◈◈◈◈ -->
                    <div
                        v-if="open"
                        :class="{'hidden': !open, 'mobile': data.mobile}"
                        class="selectors-vue"
                    >
                        <!-- ◈◈◈◈◈ ЗАГОЛОВОК МОБИЛЬНОЙ ВЕРСИИ ◈◈◈◈◈ -->
                            <h3
                                v-if="data.mobile"
                                style="margin: 0 0 1rem"
                            >{{ data.label }}</h3>
                        <!-- ◈◈◈◈◈ ЗАГОЛОВОК МОБИЛЬНОЙ ВЕРСИИ ◈◈◈◈◈ -->
                        <!-- ◈◈◈◈◈ СТРОКА ПОИСКА ◈◈◈◈◈ -->
                            <div v-if="search_need" class="search-input-vue">
                                <input
                                    v-model="search_word"
                                    :class="{'invalid': search_word}"
                                    class="search-input-vue"
                                    placeholder="Поиск"
                                    type="text"
                                    autocomplete="off"
                                >
                            </div>
                        <!-- ◈◈◈◈◈ СТРОКА ПОИСКА ◈◈◈◈◈ -->
                        <!-- ◈◈◈◈◈ ПАНЕЛЬ ВЫБОРА ◈◈◈◈◈ -->
                            <div
                                :class="{'mobile mb-1': data.mobile}"
                                class="reducer"
                            >
                                <template v-if="refs_src_len">
                                    <!-- ◈◈◈◈◈ СПИСОК ВЫБОРА ◈◈◈◈◈ -->
                                        <div
                                            v-for="(item, i) in refs_real"
                                            class="option"
                                        >
                                            <input
                                                :id="index + '.' + i"
                                                :key="index + '.' + i"
                                                @change="changeFilter(i)"
                                                :checked="isFilterChanged(i)"
                                                type="checkbox"
                                            >
                                            <label
                                                :for="index + '.' + i"
                                                style="width: fit-content;"
                                            >
                                                {{ item }}
                                            </label>
                                        </div>
                                    <!-- ◈◈◈◈◈ ПАНЕЛЬ ВЫБОРА ◈◈◈◈◈ -->
                                    <!-- ◈◈◈◈◈ СООБЩЕНИЕ ◈◈◈◈◈ -->
                                        <div v-if="!refs_real_len && search_word">
                                            <div class="option radio">
                                                По заданному поиску ничего не найдено
                                            </div>
                                        </div>
                                    <!-- ◈◈◈◈◈ СООБЩЕНИЕ ◈◈◈◈◈ -->
                                </template>
                                <div
                                    v-else
                                    v-html="data.refs_null || 'Ничего нет :-('"
                                    class="option radio"
                                />
                            </div>
                        <!-- ◈◈◈◈◈ ПАНЕЛЬ ВЫБОРА ◈◈◈◈◈ -->
                        <!-- ◈◈◈◈◈ КНОПКА ЗАКРЫТЬ ДЛЯ МОБИЛЬНОЙ ВЕРСИИ ◈◈◈◈◈ -->
                            <div v-if="data.mobile" class="center-xs">
                                <button
                                    @click="open = false"
                                    class="button button-small button-red"
                                    type="button"
                                >Закрыть</button>
                            </div>
                        <!-- ◈◈◈◈◈ КНОПКА ЗАКРЫТЬ ДЛЯ МОБИЛЬНОЙ ВЕРСИИ ◈◈◈◈◈ -->
                    </div>
                <!-- ◈◈◈◈◈ ПАНЕЛЬ ФИЛЬТРА ◈◈◈◈◈ -->
            </div>
        </div>
    `
});


Vue.component('rnp-mrnc-tooltip-v1', {
    props: ['data', 'index'],
    data: function() {
        let mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i;
        return {
            tooltip_view: false,
            mobile: mobile.test(navigator.userAgent)
        }
    },
    beforeCreate: function() {
        window.addEventListener('resize', () => this.resize());
    },
    watch: {
        'tooltip_view': function() {
            if (this.tooltip_view) {
                window.addEventListener('click', e => this.close(e) );
                //  ~~~
                let el = this.$refs[this.index];
                el.setAttribute('style', 'right: 0px !important');
                let pos = parseInt(el.getBoundingClientRect().x);
                if (pos < 0) {
                    let value = 'right: ' + (pos - 15) + 'px !important';
                    el.setAttribute('style', value);
                }
            } else {
                window.removeEventListener('click', e => this.close(e) );
            }
        }
    },
    methods: {
        resize: function() {
            this.tooltip_view = false;
        },
        open: function() {
            if (this.mobile) {
                this.tooltip_view = !this.tooltip_view;
            }
        },
        close: function(e) {
            let parent = e.target.closest('.custom-select__info');
            if (parent) {
                if (parent.getAttribute('data-name') === this.index) {
                    return false;
                }
            }
            this.tooltip_view = false;
        },
        mouseAction: function(state) {
            if (!this.mobile) {
                this.tooltip_view = state;
            }
        }
    },
    beforeDestroy: function() {
        window.removeEventListener('click', e => this.close(e));
        window.addEventListener('resize', () => this.resize());
    },
    template: `
        <div v-if="data" :data-name="index" class="custom-select__info">
            <button
                @click="open(true)"
                @mouseover="mouseAction(true)"
                @mouseleave="mouseAction(false)"
                class="custom-select__info_button" type="button">?</button>
            <p :ref="index" :class="{'open': tooltip_view}" class="custom-select__info_text">{{ data }}</p>
        </div>
    `
});