import { deepClone } from 'utils/tools'

export const createNode = (type) => {
  const nodes = {
    1: { type: 1, title: '发起人', icon: '', content: 'xxx公司', children: [], renderIndex: null },
    2: { type: 2, title: '审批人', icon: '', content: '请设置审批人', children: [], renderIndex: null },
    3: { type: 3, title: '抄送人', icon: '', content: '请设置抄送人', children: [], renderIndex: null },
    4: { type: 4, title: '条件分支', conditions: [], renderIndex: null, children: [] },
    5: { type: 5, title: '条件分支节点', renderIndex: null, children: [] },
  }
  let node = { ...nodes[type], renderIndex: new Date().getTime() }

  // 条件节点默认添加两个条件
  if (type === 4) {
    node.conditions.push(createNode(5))
    let n = createNode(5)
    node.conditions.push({ ...n, renderIndex: n.renderIndex + 1 })
  }
  return node
}

// 创建初始工作流
export const createInitNode = () => {
  return [createNode(1)]
}

// 工作流中插入节点
export const insertNode = (node, pNode) => {
  console.log(pNode)

  // 发起人节点
  if (node.type === 1) return

  // 审批人、抄送人、条件节点
  if ([2, 3, 4].includes(node.type)) {
    node.children = deepClone(pNode.children)
    pNode.children = [deepClone({ ...node })]
  }

  // 条件分支
  if ([5].includes(node.type)) {
    return
  }
}

const getNodeByRenderIndex = (flows, index) => {
  const node = flows[0]
  // 有 index
  if (index !== undefined) {
    if (node.renderIndex === index) {
      console.log(node.renderIndex, index)
      return node
    } else if (node.children.length > 0) {
      return getNodeByRenderIndex(node.children, index)
    } else {
      return null
    }
  } else {
    if (node.children.length <= 0) {
      return node
    } else {
      return getNodeByRenderIndex(node.children)
    }
  }
}

export const addCondition = (node) => {
  if (node.type === 4) {
    node.conditions.push(createNode(5))
  }
}

export const tree = [
  {
    type: 1,
    title: '发起人',
    icon: '',
    content: 'xxx公司',
    active: '',
    renderIndex: 1,
    children: [
      {
        type: 4,
        title: '条件分支',
        active: '',
        conditions: [
          {
            type: 5,
            title: '条件分支节点1',
            renderIndex: 111,
            children: [
              {
                type: 3,
                title: '抄送人111',
                icon: '',
                content: '请设置审批人',
                children: [],
                renderIndex: 25,
              },
              {
                type: 3,
                title: '抄送人22',
                icon: '',
                content: '请设置审批人',
                children: [],
                renderIndex: 5,
              },
            ],
          },
          { type: 5, title: '条件分支节点2', renderIndex: 3321312, children: [] },
        ],
        renderIndex: 2,
        children: [
          {
            type: 2,
            title: '审批人',
            icon: '',
            content: '请设置审批人',
            active: '',
            renderIndex: 3,
            children: [
              {
                type: 3,
                title: '抄送人',
                children: [],
                icon: '',
                content: '请设置审批人',
                renderIndex: 4,
                active: '',
                children: [
                  {
                    type: 3,
                    title: '抄送人',
                    icon: '',
                    content: '请设置审批人',
                    children: [],
                    renderIndex: 124125215125,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

const s = [
  {
    type: 1,
    title: '发起人',
    icon: '',
    content: 'xxx公司',
    originatorType: '1',
    canCommitPersons: [],
    children: [
      {
        type: 2,
        title: '审批人',
        icon: '',
        content: '请设置审批人',
        children: [
          {
            type: 4,
            title: '条件分支',
            conditions: [
              {
                type: 5,
                title: '条件分支节点',
                renderIndex: 1657787903364,
                children: [],
              },
              {
                type: 5,
                title: '条件分支节点',
                renderIndex: 1657787903364,
                children: [
                  {
                    type: 2,
                    title: '审批人',
                    icon: '',
                    content: '请设置审批人',
                    children: [
                      {
                        type: 4,
                        title: '条件分支',
                        conditions: [
                          {
                            type: 5,
                            title: '条件分支节点',
                            renderIndex: 1657787924884,
                            children: [],
                          },
                          {
                            type: 5,
                            title: '条件分支节点',
                            renderIndex: 1657787924884,
                            children: [],
                          },
                        ],
                        renderIndex: 1657787924884,
                        children: [],
                      },
                    ],
                    renderIndex: 1657787915246,
                  },
                ],
              },
            ],
            renderIndex: 1657787903364,
            children: [
              {
                type: 2,
                title: '审批人',
                icon: '',
                content: '请设置审批人',
                children: [],
                renderIndex: 1657787999689,
              },
            ],
          },
        ],
        renderIndex: 1657787901734,
      },
    ],
    renderIndex: 1657787884635,
  },
]
