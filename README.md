1.flex:设置为了大于0的整数，本布局和子组件才可以进行伸缩变化；
（1）当父布局设置为flex:1，每个子布局中都设置了flex:a(b,c),则有设置flex:x属性的子布局进行按比例扩展到父布局的剩余空间
    为什么说是剩余空间呢？因为父布局中的某些布局可以没有设置flex:x属性，则该子布局是按照默认的大小，然后父布局减去其大小后
    才把剩余的大小给有设置flex:x属性的子布局们进行评分；
2.关于组件的生命周期
（1）参考 CarInfoView 组件
