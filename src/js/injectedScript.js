export default function () {
  if (!window.cc) return;
  const SerializeProps = {
    default: [
      //identity
      'name',
      'active',
      'uuid',
      //position, dimesion
      'x', 'y', 'width', 'height', 'zIndex',
      //prepresentation
      'color', 'opacity',
      //transformation
      'anchorX', 'anchorY',
      'rotation', 'rotationX', 'rotationY',
      'scale', 'scaleX', 'scaleY',
      // 'skewX', 'skewY'
    ],
    '2.0.0': [
      //identity
      'name',
      'active',
      'uuid',
      //position, dimesion
      'x', 'y', 'width', 'height', 'zIndex',
      //prepresentation
      'color', 'opacity',
      //transformation
      'anchorX', 'anchorY',
      'angle', 'eulerAngles',
      'scale', 'scaleX', 'scaleY',
      // 'skewX', 'skewY'
    ],
    '3.x': [  //实际测试版本为3.6.2
      //identity
      'name',
      'active',
      'uuid',
      //position, dimesion
      { key: 'x', get: (n) => n.position.x, set: (n, v) => n.setPosition(cc.v3(v, n.position.y, n.position.z)) },
      { key: 'y', get: (n) => n.position.y, set: (n, v) => n.setPosition(cc.v3(n.position.x, v, n.position.z)) },
      { key: 'z', get: (n) => n.position.z, set: (n, v) => n.setPosition(cc.v3(n.position.x, n.position.y, v)) },
      'angle', 'eulerAngles',
      // { key: 'rotationX', get: (n) => n.rotation.x, set: (n, v) => n.setRotation(cc.v4(v, n.rotation.y, n.rotation.z, n.rotation.w)) },
      // { key: 'rotationY', get: (n) => n.rotation.y, set: (n, v) => n.setRotation(cc.v4(n.rotation.x, v, n.rotation.z, n.rotation.w)) },
      // { key: 'rotationZ', get: (n) => n.rotation.z, set: (n, v) => n.setRotation(cc.v4(n.rotation.x, n.rotation.y, v, n.rotation.w)) },
      { key: 'scaleX', get: (n) => n.scale.x, set: (n, v) => n.setScale(cc.v3(v, n.scale.y, n.scale.z)) },
      { key: 'scaleY', get: (n) => n.scale.y, set: (n, v) => n.setScale(cc.v3(n.scale.x, v, n.scale.z)) },
      { key: 'scaleZ', get: (n) => n.scale.z, set: (n, v) => n.setScale(cc.v3(n.scale.x, n.scale.y, v)) },
      {
        key: 'width',
        get: (n) => n.getComponent(cc.UITransformComponent) ? n.getComponent(cc.UITransformComponent).width : 0,
        set: (n, v) => n.getComponent(cc.UITransformComponent) && (n.getComponent(cc.UITransformComponent).width = v)
      },
      {
        key: 'height',
        get: (n) => n.getComponent(cc.UITransformComponent) ? n.getComponent(cc.UITransformComponent).height : 0,
        set: (n, v) => n.getComponent(cc.UITransformComponent) && (n.getComponent(cc.UITransformComponent).height = v)
      },
      {
        key: 'anchorX',
        get: (n) => n.getComponent(cc.UITransformComponent) ? n.getComponent(cc.UITransformComponent).anchorX : 0,
        set: (n, v) => n.getComponent(cc.UITransformComponent) && (n.getComponent(cc.UITransformComponent).anchorX = v)

      },
      {
        key: 'anchorY',
        get: (n) => n.getComponent(cc.UITransformComponent) ? n.getComponent(cc.UITransformComponent).anchorY : 0,
        set: (n, v) => n.getComponent(cc.UITransformComponent) && (n.getComponent(cc.UITransformComponent).anchorY = v)
      },
      {
        key: 'color',
        get: (n) => n.getComponent("cc.UIRenderer") ? n.getComponent("cc.UIRenderer").color : cc.Color.WHITE,
        set: (n, v) => n.getComponent("cc.UIRenderer") && (n.getComponent("cc.UIRenderer").color = v)
      },
      {
        key: 'opacity',
        get: (n) => {
          const opcom = n.getComponent("cc.UIOpacity");
          if (opcom) {
            return opcom.opacity;
          } else {
            return n.getComponent("cc.UIRenderer") ? n.getComponent("cc.UIRenderer").color.a : 255
          }
        },
        set: (n, v) => {
          const opcom = n.getComponent("cc.UIOpacity");
          if (opcom) {
            opcom.opacity = v;
          } else {
            let rander = n.getComponent("cc.UIRenderer");
            if (rander) {
              let color = rander.color.clone();
              color.a = v;
              rander.color = color;
            }
          }
        }
      },
    ]
  };

  const CustomComponentProps = [  //自定义属性,基于组件原有内容扩展
    {
      component: 'cc.Sprite',
      props: [
        // {
        //   keys: ['_spriteFrame', 'spriteFrame'],
        //   get: (n) => n.spriteFrame,
        // },
        {
          key: 'image',
          get: (c) => c.spriteFrame ? c.spriteFrame.name : '',
        },
        {
          key: 'inset[Left,Top,Right,Bottoom]',
          get: (c) => c.spriteFrame ? c.spriteFrame._capInsets.toString() : ''
        },
        {
          key: 'type',
          get: (c) => cc.Sprite.Type[c._type]
        },
        {
          key: 'size mode',
          get: (c) => cc.Sprite.SizeMode[c._sizeMode]
        }, {
          key: 'Src Blend',
          get: (c) => cc.Sprite.BlendState[c._srcBlendFactor]
        }, {
          key: 'Dst Blend',
          get: (c) => cc.Sprite.BlendState[c._dstBlendFactor]
        }
      ]
    },
    {
      component: 'cc.ParticleSystem2D',
      props: [
        {
          key: 'file',
          get: (c) => c.file ? c.file.name : '',
        },
        {
          key: 'image',
          get: (c) => c.spriteFrame ? c.spriteFrame.name : '',
        },
        {
          key: 'Src Blend',
          get: (c) => cc.Sprite.BlendState[c._srcBlendFactor]
        },
        {
          key: 'Dst Blend',
          get: (c) => cc.Sprite.BlendState[c._dstBlendFactor]
        }
      ],
    },
    {
      component: 'cc.Animation',
      props: [
        {
          key: 'defaultClip',
          get: (c) => c.defaultClip ? c.defaultClip.name : '',
        },
        {
          key: 'clips',
          get: (c) => c.clips ? c.clips.map(v => v.name).join(",") : '',
        }
      ]
    },
    {
      component: 'cc.Label',
      props: [

        {
          key: 'string',
          get: (c) => c.string,
        },
        {
          key: 'horizontalAlign',
          get: (c) => c.horizontalAlign,
        },
        {
          key: 'verticalAlign',
          get: (c) => c.verticalAlign,
        },
        {
          key: 'font',
          get: (c) => c.font ? c.font.name : '',
        },
        {
          key: 'fontSize',
          get: (c) => c.fontSize,
        },
        {
          key: 'lineHeight',
          get: (c) => c.lineHeight,
        },
        {
          key: 'overflow',
          get: (c) => c.overflow,
        },
        {
          key: 'enableWrapText',
          get: (c) => c.enableWrapText,
        },
        {
          key: 'isSystemFontUsed',
          get: (c) => c.isSystemFontUsed,
        }

        // fontFamily: com.fontFamily,
        // spacingX: com.spacingX,
        // isBold: com.isBold,
        // isItalic: com.isItalic,
        // isUnderline: com.isUnderline,
        // cacheMode: com.cacheMode,
        // srcBlendFactor: com._srcBlendFactor,
        // dstBlendFactor: com._dstBlendFactor



      ]
    },
    {
      component: 'cc.RichText',
      props: [
        {
          key: 'font',
          get: (c) => c.font ? c.font.name : '',
        }
      ]
    }
  ]

  const ignoredComponentProp = [
    "_name",
    "_objFlags",
    "node",
    "name",
    "uuid",
    "__scriptAsset",
    "_enabled",
    "enabled",
    "enabledInHierarchy",
    "_isOnLoadCalled"
  ];

  const includeComponentProp = [  //强制需要显示的属性
    //Layout ---- 
    "_paddingBottom",
    "_paddingLeft",
    "_paddingRight",
    "_paddingTop",
    "_spacingX",
    "_spacingY",
    "_startAxis",
    //Layout ---- 

    // //Label ----
    // "_string",
    // "_fontSize",
    // "_lineHeight",
    // "_fontFamily",
    // "_isSystemFontUsed",


    //ParticleSystem ----
    "_startColor",
    "_startColorVar",
    "_endColor",
    "_endColorVar",
    "_totalParticles",


    // "_spriteFrame",
    // "_sizeMode",
    // "_font",
    // "_texture"
  ];

  const DebugLayerCss = `
    .debug-layer.show-all .debug-box,
    .debug-box:hover,
    .debug-box.selected {
      outline: 1px dashed rgba(255,0,0,.8);
    }
    #cc-devtool-debug {
      background-color: rgba(0,0,0,0.1);
    }`;

  const noop = new Function();
  const NodesCache = {}; // Node cache which contains cc.Node refs
  const NodesCacheData = {} // Node data cache
  const DebugLayerId = 'cc-devtool-debug';
  const DebugLayerStyleId = 'cc-devtool-style';

  const ccdevtool = window.ccdevtool = {
    nodeId: 1,
    NodesCacheData,

    getProps() {
      let propkey = "default";
      if (cc.ENGINE_VERSION >= '2.0.0') {
        propkey = '2.0.0';
      }
      if (cc.ENGINE_VERSION >= '3.0.0') {
        propkey = '3.x';
      }

      return SerializeProps[propkey];
    },

    /**
     * Load tree node data
     * @return {Object} node data in JSON
     */
    getTreeNodes() {
      const scene = cc.director.getScene();
      var ret = [];
      const bak = cc.error;
      try {
        // suppress deprecation error
        cc.error = noop;
        this.nodeId = 1;
        ret = this.serialize(scene);
      } catch (e) {
        log(e)
      } finally {
        // restore cc.error
        cc.error = bak;
      }
      return ret;
    },
    compile() {
      fetch('/update-db');
      setTimeout(location.reload, 2000);
    },
    /**
     * Post message to content script and then forward message to cc-devtool
     * @param  {String} type, all type are prefixed with ':'
     * @param  {any} data
     */
    postMessage(type, data) {
      window.postMessage({ type, data }, '*');
    },
    hasElement(selector) {
      return !!document.querySelector(selector);
    },
    /**
     * Show/hide given element
     * @param  {String} selector
     * @param  {Boolean} val, true fro show, false for hide
     */
    toggleElement(selector, val) {
      var ele = document.querySelector(selector);
      if (!ele) return false;
      ele.style.display = val ? '' : 'none';
    },
    /**
     * Show/hide given node
     * @param  {String} selector
     * @param  {Boolean} val, true fro show, false for hide
     */
    toggleNode(path, value) {
      const node = cc.find(path);
      if (node) node.active = !!value;
    },
    /**
     * Hide debugging div
     */
    hideDebugLayer() {
      this.toggleElement(`#${DebugLayerId}`, false);
    },
    /**
     * Create debugging div
     */
    createDebugLayer() {
      var debugLayer = document.getElementById(DebugLayerId);
      if (debugLayer) {
        debugLayer.parentNode.removeChild(debugLayer);
      }
      debugLayer = document.createElement('div');
      debugLayer.id = DebugLayerId;
      debugLayer.classList.add('cc-devtool');
      debugLayer.classList.add('debug-layer');
      const s = debugLayer.style;
      s.position = 'absolute';
      s.top = s.bottom = s.left = s.right = 0;

      const ctn = document.querySelector('#Cocos2dGameContainer');
      ctn.position = 'relative';
      ctn.appendChild(debugLayer);

      // style
      var style = document.getElementById(DebugLayerStyleId);
      if (!style) style = document.createElement('style');
      style.id = DebugLayerStyleId
      style.innerHTML = DebugLayerCss;
      document.body.appendChild(style);
    },
    /**
     * Create debugging box for given node on debug layer
     * @param  {cc.Node} n
     * @param  {Number} zIndex
     */
    createDebugBox(n, zIndex) {
      const nodeInfo = NodesCacheData[n.uuid];
      if (!nodeInfo || !nodeInfo.box) return;
      var div = document.getElementById(n.uuid);
      if (div) {
        div.parentNode.removeChild(div);
      }

      // const canvas = document.getElementById('#GameCanvas');
      // const rect = canvas.getBoundingClientRect();
      // const ccCanvas = cc.find('Canvas').getComponnet(cc.Canvas);
      // const resolution = ccCanvas.designResolution;
      // const hratio = resolution.width / 2 / rect.width;
      // const vratio = resolution.height / 2 / rect.height;
      const hratio = 1, vratio = 1;

      const box = nodeInfo.box;
      div = document.createElement('div');
      n.debugBox = div;
      div.id = n.uuid;
      div.classList.add('cc-devtool')
      div.classList.add('debug-box')

      const s = div.style;
      s.position = 'absolute';
      s.width = (box.width / hratio) + 'px';
      s.height = (box.height / vratio) + 'px'
      s.bottom = (box.bottom / vratio) + 'px';
      s.left = (box.left / hratio) + 'px';
      // s.outline = '1px solid #eee';
      s.outlineOffset = '0px';
      s.zIndex = zIndex;
      s.innerText = nodeInfo.label
      div.dataset.name = nodeInfo.label;

      const debugLayer = document.getElementById(DebugLayerId)
      debugLayer.appendChild(div);
    },
    /**
     * Set helper variable $n0, $n1
     * @param  {String} uuid, uuid of node
     */
    selectNode(uuid) {
      window.$n1 = window.$n0
      window.$n0 = NodesCache[uuid];


      for (let i = 0; i < 100; i++) {
        if (window[`$c${i}`] != undefined) {
          delete window[`$c${i}`];
        }
      }

      if (window.$n0 && window.$n0.components) {
        window.$n0.components.forEach((v, i) => {
          window[`$c${i}`] = v;
        })
      }


      // const prevBoxes = document.querySelectorAll(`#${DebugLayerId} .debug-box.selected`);
      // if (prevBoxes.length) {
      //   prevBoxes.forEach(it => it.classList.remove('selected'));
      // }
      // const box = document.getElementById(uuid);
      // box.classList.add('selected');
    },
    /**
     * Update node property
     * @param  {String} uuid, uuid of node
     * @param  {String} key, property name
     * @param  {any} value, property value
     */
    updateNode(uuid, key, value) {
      const props = this.getProps();
      const node = NodesCache[uuid];
      const nodeInfo = NodesCacheData[uuid];
      if (!node || !nodeInfo) return;
      const prop = nodeInfo.props.find(p => p.key === key);
      if (prop) prop.value = value;
      if (key === 'color') {
        let comp = hexToRgb(value);
        if (comp) {

          if (props.indexOf(key) == -1) {
            const prop = props.find(v => v.key == key);
            if (prop) {
              prop.set(node, new cc.Color(comp.r, comp.g, comp.b));
            }
          } else {
            node[key] = new cc.Color(comp.r, comp.g, comp.b);
          }
          return
        }
      } else if (key === 'eulerAngles') {
        try {
          let xyz = value.replace(/[()]/, '').split(', ').map(parseFloat);
          return node[key] = cc.v3.apply(cc.v3, xyz);
        } catch (e) {
          console.error(`Can not convert ${value} to cc.v3`);
        }
      }
      if (props.indexOf(key) == -1) {
        const prop = props.find(v => v.key == key);
        if (prop) {
          prop.set(node, value);
        }
      } else {
        node[key] = value;
      }
    },
    /**
     * Print comopnent in Console
     * @param  {String} uuid, uuid of node
     * @param  {Number} index, index of component
     */
    inspectComponent(uuid, index) {
      console.trace(window.$c = NodesCache[uuid]._components[index]);
    },
    /**
     * Print node in Console
     * @param  {String} uuid, uuid of a node
     */
    inspectNode(uuid) {
      console.trace(window.$n = NodesCache[uuid]);
    },
    reloadScene() {
      try {
        const s = cc.director.getScene();
        cc.director.loadScene(s.name);
      } catch (e) { }
    },
    /**
     * Serialize node info/props into plain objects
     * @param  {cc.Scene|cc.Node} n
     * @param  {Number} zIndex
     * @return {Object}
     */
    serialize: function (n, zIndex = 0) {

      const props = this.getProps();

      let kv = [];
      if (props.length > 0) {
        kv = props.reduce((result, ikey) => {


          var key = ikey.key || ikey;
          var value = typeof ikey == 'object' ? ikey.get(n) : n[ikey];
          if (key === 'color') value = value.toCSS();
          if (key === 'eulerAngles') value = value.toString()
          result.push({ key, value });
          return result;
        }, []);
      }
      // box for make debugging div box
      var box = null;
      if (n.parent) {

        if (cc.ENGINE_VERSION >= '3.0.0') {
          const tranCom = n.getComponent(cc.UITransformComponent);
          if (tranCom) {
            box = tranCom.getBoundingBoxToWorld();
          }
          if (box) {
            box.left = box.x / 2;
            box.bottom = box.y / 2;
            box.width = tranCom.width / 2;
            box.height = tranCom.height / 2;
          }
        } else {
          box = n.getBoundingBoxToWorld();
          if (box) {
            box.left = box.x / 2;
            box.bottom = box.y / 2;
            box.width = n.width / 2;
            box.height = n.height / 2;
          }
        }

      }
      /**
       * Cache node in some place other than NodesCacheData
       * pass node reference to devtool will cause `Object reference chain is too long` error
       */
      NodesCache[n.uuid] = n;
      n.off('position-changed', this.onPositionChanged, n);
      n.on('position-changed', this.onPositionChanged, n);

      n.off('size-changed', this.onSizeChanged, n);
      n.on('size-changed', this.onSizeChanged, n);

      n.off('scale-changed', this.onScaleChanged, n);
      n.on('scale-changed', this.onScaleChanged, n);

      n.off('rotation-changed', this.onRotationChanged, n);
      n.on('rotation-changed', this.onRotationChanged, n);

      n.off('color-changed', this.onColorChanged, n);
      n.on('color-changed', this.onColorChanged, n);

      n.off('anchor-changed', this.onAnchorChanged, n);
      n.on('anchor-changed', this.onAnchorChanged, n);

      n.off('active-in-hierarchy-changed', this.onActiveInHierarchyChanged, n);
      n.on('active-in-hierarchy-changed', this.onActiveInHierarchyChanged, n);

      n.off('sibling-order-changed', this.onSiblingOrderChanged, n);
      n.on('sibling-order-changed', this.onSiblingOrderChanged, n);

      n.off('child-removed', this.onChildRemoved, n);
      n.on('child-removed', this.onChildRemoved, n);

      n.off('child-added', this.onChildAdded, n);
      n.on('child-added', this.onChildAdded, n);

      proxyPropSetter(n, 'opacity', 'opacity-changed');
      n.off('opacity-changed', this.onOpacityChanged, n);
      n.on('opacity-changed', this.onOpacityChanged, n);

      const ret = NodesCacheData[n.uuid] = {
        // node: n, // this will cause `Object reference chain is too long` error
        id: this.nodeId++,
        parentUuid: n.parent ? n.parent.uuid : null,
        uuid: n.uuid,
        label: n.name,
        props: kv,
        comps: getComponentsData(n),
        box,
        children: n.children.map(it => ccdevtool.serialize(it, zIndex + 1))
      }
      // if (n.parent !== cc.director.getScene()) this.createDebugBox(n, zIndex);
      return ret;
    },
    onPositionChanged() {
      if (!(this instanceof cc.Node)) return;
      const data = { uuid: this.uuid, x: this.x, y: this.y };
      ccdevtool.postMessage('position-changed', data);
    },
    onSizeChanged() {
      if (!(this instanceof cc.Node)) return;
      const data = { uuid: this.uuid, width: this.width, height: this.height };
      ccdevtool.postMessage('size-changed', data);
    },
    onScaleChanged() {
      if (!(this instanceof cc.Node)) return;
      const data = { uuid: this.uuid, scaleX: this.scaleX, scaleY: this.scaleY, scale: this.scale };
      ccdevtool.postMessage('scale-changed', data);
    },
    onRotationChanged() {
      if (!(this instanceof cc.Node)) return;
      const data = { uuid: this.uuid, rotationX: this.eulerAngles.x, rotationY: this.eulerAngles.y, rotation: this.angle };
      ccdevtool.postMessage('rotation-changed', data);
    },
    onColorChanged() {
      if (!(this instanceof cc.Node)) return;
      const data = { uuid: this.uuid, color: this.color };
      ccdevtool.postMessage('color-changed', data);
    },
    onAnchorChanged() {
      if (!(this instanceof cc.Node)) return;
      const data = { uuid: this.uuid, anchorX: this.anchorX, anchorY: this.anchorY, anchor: this.anchor };
      ccdevtool.postMessage('anchor-changed', data);
    },
    onActiveInHierarchyChanged() {
      if (!(this instanceof cc.Node)) return;
      const data = { uuid: this.uuid, active: this.active };
      ccdevtool.postMessage('active-in-hierarchy-changed', data);
    },
    onSiblingOrderChanged() {
      if (!(this instanceof cc.Node)) return;
      const data = { uuid: this.uuid, zIndex: this.zIndex };
      ccdevtool.postMessage('sibling-order-changed', data);
    },
    onOpacityChanged() {
      if (!(this instanceof cc.Node)) return;
      const data = { uuid: this.uuid, opacity: this.opacity };
      ccdevtool.postMessage('opacity-changed', data);
    },
    onChildRemoved(child) {
      if (!(child instanceof cc.Node)) return;
      const data = { uuid: child.uuid };
      ccdevtool.postMessage('child-removed', data);
    },
    onChildAdded(child) {
      if (!(child instanceof cc.Node)) return;
      const data = ccdevtool.serialize(child);
      const index = child.parent.children.findIndex(c => c === child);
      ccdevtool.postMessage('child-added', { child: data, parentUuid: this.uuid, index: index });
    }
  };

  /**
   * Hijack cc.director.loadScene()
   * when loadScene is called, notify cc-devtool panel to refresh node tree
   */
  if (cc.director && typeof cc.director.loadScene === 'function') {
    let loadScene = cc.director.loadScene;
    cc.director.loadScene = function () {
      ccdevtool.postMessage(':loadScene');
      return loadScene.apply(cc.director, arguments);
    };
  }
  if (cc && cc.game) {
    cc.game.on("game_on_show", function () {
      ccdevtool.postMessage('game_on_show');
    });
  }
  //    if (cc && cc.game && cc.game.run) {
  //      let run = cc.game.run;
  //      cc.game.run = function () {
  //        let ret =  run.apply(cc.game, arguments);
  //        let onProgress = cc.loader.onProgress;
  //        console.log('cc.game.run');
  //        debugger;
  //        cc.loader.onProgress = function (completedCount, totalCount, item) {
  //          debugger;
  //          console.log(`cc.loader.onProgress:${completedCount}/${totalCount}`);
  //          if (completedCount === totalCount) ccdevtool.postMessage(':loadComplete')
  //          return onProgress.apply(cc.loader, arguments);
  //        };
  //
  //        ccdevtool.postMessage(':gameStarted');
  //        return ret;
  //      };
  //    }


  /**
   * print a nice-looking notification if this file injected
   */
  console.log(
    `%c cc-devtools %c Detected Cocos Creator Game %c`,
    'background:#35495e ; padding: 1px; border-radius: 2px 0 0 2px;  color: #fff',
    'background:#409EFF ; padding: 1px; border-radius: 0 2px 2px 0;  color: #fff',
    'background:transparent'
  );

  ccdevtool.postMessage(':cc-found', true);

  /**
   * Get components data from given node
   * @param  {cc.Node} n
   * @return {Array} array of property/value
   */
  function getComponentsData(n) {
    const comps = n._components;
    return comps.reduce((result, comp, i) => {

      let props = [];
      if (comp.constructor.__props__ && comp.constructor.__props__.length > 0) {
        props = comp.constructor.__props__.filter(prop => {
          return ignoredComponentProp.indexOf(prop) < 0 && (prop[0] != '_' || includeComponentProp.indexOf(prop) >= 0);
        }).map(name => {
          const type = typeOf(comp[name]);
          const ret = { name, type: type.component, rawType: type.raw };
          cc.js.getset(ret, 'value', () => {
            return valueOf(comp[name]);
          }, (str) => {
            comp[name] = fromString(type.rawType, str);
          }, true, true);
          return ret;
        });
      }

      let name = comp.constructor.name;
      if (name && name.length <= 1) {
        if (comp.__classname__ != null) {
          name = comp.__classname__;
        } else {
          name = comp.name;
        }
      }

      CustomComponentProps.forEach(v => {
        if (v.component == name) {
          v.props.forEach(v => {
            const pname = v.key;
            const type = typeOf(v.get(comp));
            const ret = { name: pname, type: type.component, rawType: type.raw };
            cc.js.getset(ret, 'value', () => {
              return v.get(comp);
            }, (str) => {
              comp[pname] = fromString(type.rawType, str);
            }, true, true);
            props.push(ret);
          });
        }
      });


      // console.log(props);
      result.push({
        key: name,
        index: i,
        uuid: n.uuid,
        value: '<<inspect>>',
        props
      })
      return result;
    }, [])
  }

  /**
   * Convert CSS Color from hex string to color components
   * @param  {String} hex
   * @return {Object} {r,g,b}
   */
  function hexToRgb(hex) {
    var comps = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return comps ? {
      r: parseInt(comps[1], 16),
      g: parseInt(comps[2], 16),
      b: parseInt(comps[3], 16)
    } : null;
  }

  function rgba2color(str) {
    const vec = str.replace(/ /g, '')
      .replace(/^rgba?/, '')
    const comps = str2array(vec);
    return cc.color.apply(cc, comps);
  }

  function valueOf(val) {
    const t = typeof val;
    if (t === 'undefined' || t === 'string' || t === 'number' || t === 'boolean') {
      return val;
    }
    if (val === null) return 'null';
    switch (val.constructor.name) {
      case 'Color':
      case 'Size':
      case 'Vec2':
      case 'Vec3':
        return val.toString();
    }
    switch (val.__classname__) {
      case 'cc.Color':
      case 'cc.Size':
      case 'cc.Vec2':
      case 'cc.Vec3':
        return val.toString();
    }
    if (val && val.constructor) return `<${val.constructor.name}>`;
    return '<unknown>';
  }

  function typeOf(val) {
    let raw = typeof val;
    let c = '';
    switch (raw) {
      case 'string':
        c = 'ElInput';
        break;
      case 'number':
        c = 'ElInputNumber'
        break;
      case 'boolean':
        c = 'ElSwitch'
        break;
    }
    if (!c && val && val.constructor) {
      raw = val.constructor.name;
      switch (raw) {
        case 'Color':
          c = 'ElColorPicker'
          break;
        case 'Vec2':
        case 'Vec3':
        case 'Size':
          c = 'ElInput';
          break;
      }
      if (!c) {
        switch (val.__classname__) {
          case 'cc.Color':
            c = 'ElColorPicker'
            break;
          case 'cc.Size':
          case 'cc.Vec2':
          case 'cc.Vec3':
            c = 'ElInput';
            break;
        }
      }
    }
    return { raw, component: c };
  }

  function fromString(rawType, str) {
    switch (rawType) {
      case 'null':
      case 'undefined':
      case 'string':
        return str;
      case 'number':
        return str.indexOf('.') >= 0 ? parseFloat(str) : parseInt(str, 10);
      case 'boolean':
        return str === 'true'
      case 'Vec2':
      case 'Vec3':
        return str2vec(str);
      case 'Size':
        return str2size(str);
      case 'Color':
        return str2color(str);
      default:
        return str;
    }
  }

  function str2array(str) {
    return str.replace(/[()]/, '').split(',').map(n => parseInt(n.trim(), 10));
  }

  function str2size(str) {
    const vec = str2array(str);
    return cc.size.apply(cc, vec);
  }

  function str2vec(str) {
    const vec = str2array(str);
    return vec.length === 3 ? cc.v3.apply(cc, vec) : cc.v2.apply(cc, vec);
  }

  function str2color(str) {
    let c = hexToRgb(str);
    if (!c) {
      return cc.color(c.r, c.g, c.b, 255);
    }
    return rgba2color(str);
  }

  function proxyPropSetter(n, prop, event) {
    try {
      const setter = Object.getOwnPropertyDescriptor(n.constructor.prototype, prop).set;
      if (setter.__imprinted) {
        console.log('imprinted, skip');
        return;
      };
      const newSetter = function (value) {
        setter.call(this, value);
        this.emit(event);
      }
      newSetter.__imprinted = true;
      cc.js.getset(n, prop, function () {
        return this._opacity;
      }, newSetter);
    } catch (e) { }
  }
}
