import _module from 'module'
import Component from 'model/component'
import SubComponent from 'model/subcomponent'
import Action from 'model/action'
import DamageType from 'model/damageType'
import memoize from 'memoized-decorator'

let _$http, _httpConfig

export class OrderDetailService {

    constructor ($http, httpConfig) {
        _$http      = $http
        _httpConfig = httpConfig
    }

    getComponents () {

        return [

            new Component(1, 'FrontDoor', 'Puerta Frontal', [], {}, {}, 'side', false),
            new Component(2, 'BackDoor', 'Puerta Trasera', [], {}, {}, 'side', false),
            new Component(3, 'FrontPanel', 'Panel Frontal', [], {}, {}, 'side', false),
            new Component(4, 'BackPanel', 'Panel Trasero', [], {}, {}, 'side', false),
            new Component(5, 'LFbumper', 'Bumper Frontal', [], {}, {}, 'side', false),
            new Component(6, 'BackBumper', 'Bumper Trasero', [], {}, {}, 'side', false),
            new Component(7, 'FrontWheel', 'Llanta Frontal', [], {}, {}, 'side', false),
            new Component(8, 'BackWheel', 'Llanta Trasera', [], {}, {}, 'side', false),
            new Component(9, 'LFwindow', 'Ventana Frontal', [], {}, {}, 'side', false),
            new Component(10, 'LBwindow', 'Ventana Trasera', [], {}, {}, 'side', false),
            new Component(11, 'Windshield', 'Windshield', [], {}, {}, 'front', false),
            new Component(23, 'Hood', 'Capo', [], {}, {}, 'front', false),
            new Component(12, 'LeftRearView', 'Retrovisor Izquierdo', [], {}, {}, 'front', false),
            new Component(13, 'RightRearView', 'Retrovisor Derecho', [], {}, {}, 'front', false),
            new Component(14, 'CentralFront', 'Frente Central', [], {}, {}, 'front', false),
            new Component(15, 'leftlight', 'Luz Izquierda', [], {}, {}, 'front', false),
            new Component(16, 'rightlight', 'Luz Derecha', [], {}, {}, 'front', false),
            new Component(17, 'grill', 'Parrilla', [], {}, {}, 'front', false),
            new Component(18, 'Bumper', 'Bumper Frontal', [], {}, {}, 'front', false),
            new Component(19, 'LeftStop', 'Stop Izquierdo', [], {}, {}, 'rear', false),
            new Component(20, 'RightStop', 'Stop Derecho', [], {}, {}, 'rear', false),
            new Component(21, 'Trunk', 'Baul/Ventana Trasera', [], {}, {}, 'rear', false),
            new Component(22, 'RearBumper', 'Bumper Trasero', [], {}, {}, 'rear', false),
        ]

    }

    getComponentByArea (areaTitle) {

        let component =
            this.getComponents()
                .filter((component) => { 
                    return component.areaId === areaTitle 
                })[0]

        component.subComponents = 
            this.getSubComponents()
                .filter((subComponent) => {
                    return subComponent.componentId === component.id
                })
                
        return component
                
    }

    getSubComponents () {

        return [

            new SubComponent(1, 1, 'Mango', 'side'),
            new SubComponent(2, 1, 'Chapa', 'side'),
            new SubComponent(1, 2, 'Mango', 'side'),
            new SubComponent(2, 2, 'Chapa', 'side'),
            new SubComponent(3, 5, 'Luz', 'side'),
            new SubComponent(4, 5, 'Guarda Polvo', 'side'),
            new SubComponent(3, 6, 'Luz', 'side'),
            new SubComponent(5, 7, 'Aro', 'side'),
            new SubComponent(5, 8, 'Aro', 'side'),
            new SubComponent(6, 7, 'Plato', 'side'),
            new SubComponent(6, 8, 'Plato', 'side'),
            new SubComponent(7, 7, 'Chuchos', 'side'),
            new SubComponent(7, 8, 'Chuchos', 'side'),
            new SubComponent(8, 14, 'Pide vias', 'front'),
            new SubComponent(9, 14, 'Luz', 'front'),
            new SubComponent(8, 14, 'Pide vias', 'front'),
            new SubComponent(23, 14, 'Windshield', 'front'),
            new SubComponent(9, 16, 'Luz', 'front'),
            new SubComponent(10, 23, 'Insigna', 'front'),
            new SubComponent(11, 18, 'Parrilla Izquierda', 'front'),
            new SubComponent(12, 18, 'Parrilla Derecha', 'front'),
            new SubComponent(13, 18, 'Parrilla Central', 'front'),
            new SubComponent(14, 19, 'Stop', 'rear'),
            new SubComponent(15, 20, 'Stop', 'rear'),
            new SubComponent(16, 19, 'Luz', 'rear'),
            new SubComponent(17, 20, 'Luz', 'rear'),
            new SubComponent(18, 21, 'Ventana', 'rear'),
            new SubComponent(19, 21, 'Baul', 'rear'),
            new SubComponent(20, 21, 'Placa', 'rear'),
            new SubComponent(21, 21, 'Cerradura', 'rear'),
            new SubComponent(22, 22, 'Guarda Polvo', 'rear'),
        ]

    }

    getDamageTypes () {

        return [

            new DamageType(1, 'Dañado'),
            new DamageType(2, 'Falta'),
            new DamageType(3, 'Rayado'),
            new DamageType(4, 'Otro')

        ]

    }

    getActions () {

        return [

            new Action(1, 'Ninguna'),
            new Action(2, 'Revisar'),
            new Action(3, 'Reparar'),
            new Action(4, 'Pintar'),
            new Action(5, 'Cambiar'),
            new Action(6, 'Servicio')
        ]

    }
    
    saveOrder (json) {
        const url = `${_httpConfig.baseUrl}${'/detalle_servicio_de_ot/apiCrear'}`
        return _$http.post(url, json)
    }

    @memoize
    getCategories () {
        const url = `${_httpConfig.baseUrl}${'/categoria/apiLista'}`
        return _$http.get(url)
    }

    getBrands () {
        const url = `${_httpConfig.baseUrl}${'/marca/apiLista'}`
        return _$http.get(url)
    }

    getAsyncFilters () {
        return Promise.all([this.getCategories(), this.getBrands()])
    }

    getMakeYearByBrand (brandId) {
        const url = `${_httpConfig.baseUrl}${'/modelo/apiLista?'}${'marca='}${brandId}`
        return _$http.get(url)
    }

    getReplacements (categoryId = '', brandId, makeYearId) {
        const url = `${_httpConfig.baseUrl}${'/stock_producto/apiRepuestoPrecio?'}
            ${'categoria='}${categoryId}${'&marca='}${brandId}`
        return _$http.get(url)
    }

}

_module.service('orderDetailService', OrderDetailService)