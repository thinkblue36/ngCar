import _module from 'module'

let _$state

export class SideNavService {

    constructor ($state) {
        _$state = $state
    }

    getOptions () {

        return [

            {
                id: 1,
                view: 'master',
                img: 'content_copy',
                bgcolor: { 'background-color': 'blue' },
                default: true,
                navTo: () => {
                    _$state.go('root.master')
                }
            },

            {
                id: 2,
                view: 'side',
                img: 'https://s18.postimg.org/im6m00rrd/carside.png',
                bgcolor: { 'background-color': '#bbf5cb' },
                default: false,
                navTo: () => {
                    _$state.go('root.detail')
                }
            },

            {
                id: 3,
                view: 'front',
                img: 'https://s17.postimg.org/8jtrdq7tr/carfront.png',
                bgcolor: { 'background-color': '#fedfb5' },
                default: false,
                navTo: () => {
                    _$state.go('root.detail')
                }
            },
            
            {
                id: 4,
                view: 'rear',
                img: 'https://s18.postimg.org/7ffgnjyrt/carback.png',
                bgcolor: { 'background-color': '#84d8fd' },
                default: false,
                navTo: () => {
                    _$state.go('root.detail')
                }
            }
        ]

    }

}

_module.service('sideNavService', SideNavService)