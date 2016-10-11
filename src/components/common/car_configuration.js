import React from 'react'

export default class CarConfiguration extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let pageTitle
    if (this.props.isPopup) {
      let { brandName, typeName } = this.props.carParityTopInfo
      pageTitle = `${brandName} ${typeName}`
    }
    let {
      airConditioningRefrigerator,
      basicParameter,
      carBody,
      chassisSteering,
      controlConfiguration,
      engine,
      externalConfiguration,
      gearbox,
      glassMirror,
      highTechConfiguration,
      internalConfiguration,
      lightingConfiguration,
      modelId,
      modelInformation,
      motor,
      multimediaConfiguration,
      onlinedStatus,
      optionalPackage,
      safetyEquipment,
      seatConfiguration,
      status,
      wheelBrake } = this.props.carConfigurationState.carConfigurationData.configuration

  	return (
  		<div className="configuration">
        {
          this.props.isPopup ?
          <h3>
            { pageTitle }
            <button className="close_modal" onClick={this.props.closeModal}></button>
          </h3>
          : null
        }
  			<div className="carName">
  				<p>{ modelInformation.originalModelName }</p>
  			</div>
  			<ul>
  				<li>
            <div>
    					<p>基本参数</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>厂商指导价</span>
  							<span>{ basicParameter.msrp }</span>
  						</li>
  						<li>
  							<span>平均成交价</span>
  							<span>{ basicParameter.msrp }</span>
  						</li>
  						<li>
  							<span>厂商</span>
  							<span>{ basicParameter.firm }</span>
  						</li>
  						<li>
  							<span>级别</span>
  							<span>{ basicParameter.level }</span>
  						</li>
  						<li>
  							<span>发动机</span>
  							<span>{ basicParameter.engine }</span>
  						</li>
              <li>
  							<span>变速箱</span>
  							<span>{ basicParameter.gearbox }</span>
  						</li>
              <li>
  							<span>长*宽*高(mm)</span>
  							<span>{ basicParameter.lengthWidthHeight }</span>
  						</li>
              <li>
  							<span>车身结构</span>
  							<span>{ basicParameter.bodyStructure }</span>
  						</li>
              <li>
  							<span>最高车速(km/h)</span>
  							<span>{ basicParameter.maximumSpeed }</span>
  						</li>
              <li>
  							<span>官方0-100km/h加速(s)</span>
  							<span>{ basicParameter.officialAcceleration }</span>
  						</li>
              <li>
  							<span>实测0-100km/h加速(s)</span>
  							<span>{ basicParameter.measuredAcceleration }</span>
  						</li>
              <li>
  							<span>实测100-0km/h制动(m)</span>
  							<span>{ basicParameter.measuredBrake }</span>
  						</li>
              <li>
  							<span>实测油耗(L/100km)</span>
  							<span>{ basicParameter.measuredOilConsumption }</span>
  						</li>
              <li>
  							<span>工信部综合油耗(L/100km)</span>
  							<span>{ basicParameter.comprehensiveFuelConsumption }</span>
  						</li>
              <li>
  							<span>实测离地间隙(mm)</span>
  							<span>{ basicParameter.measuredGroundClearance }</span>
  						</li>
              <li>
  							<span>整车质保</span>
  							<span>{ basicParameter.vehicleWarranty }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>车身</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>长度(mm)</span>
  							<span>{ carBody.length }</span>
  						</li>
  						<li>
  							<span>宽度(mm)</span>
  							<span>{ carBody.width }</span>
  						</li>
  						<li>
  							<span>高度(mm)</span>
  							<span>{ carBody.height }</span>
  						</li>
  						<li>
  							<span>轴距(mm)</span>
  							<span>{ carBody.wheelbase }</span>
  						</li>
              <li>
  							<span>前轮距(mm)</span>
  							<span>{ carBody.frontTrack }</span>
  						</li>
  						<li>
  							<span>后轮距(mm)</span>
  							<span>{ carBody.rearWheel }</span>
  						</li>
              <li>
  							<span>最小离地间隙(mm)</span>
  							<span>{ carBody.minimumGroundClearance }</span>
  						</li>
              <li>
  							<span>整备质量(kg)</span>
  							<span>{ carBody.curbWeight }</span>
  						</li>
              <li>
  							<span>车身结构</span>
  							<span>{ carBody.bodyStructure }</span>
  						</li>
              <li>
  							<span>车门数(个)</span>
  							<span>{ carBody.carDoorNumber }</span>
  						</li>
              <li>
  							<span>座位数(个)</span>
  							<span>{ carBody.numberOfSeats}</span>
  						</li>
              <li>
  							<span>油箱容积(L)</span>
  							<span>{ carBody.tankVolume }</span>
  						</li>
              <li>
  							<span>行李箱容积(L)</span>
  							<span>{ carBody.luggageCompartmentVolume }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>发动机</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>发动机型号</span>
  							<span>{ engine.engineModel }</span>
  						</li>
              <li>
  							<span>排量(mL)</span>
  							<span>{ engine.displacement }</span>
  						</li>
              <li>
  							<span>进气形式</span>
  							<span>{ engine.airIntakeForm }</span>
  						</li>
              <li>
  							<span>气缸排列形式</span>
  							<span>{ engine.cylinderArrangement }</span>
  						</li>
              <li>
  							<span>气缸数(个)</span>
  							<span>{ engine.numberOfCylinders }</span>
  						</li>
              <li>
  							<span>每缸气门数(个)</span>
  							<span>{ engine.valveTrain }</span>
  						</li>
              <li>
  							<span>压缩比</span>
  							<span>{ engine.compressionRatio }</span>
  						</li>
              <li>
  							<span>配气机构</span>
  							<span>{ engine.airDistributionMechanism }</span>
  						</li>
              <li>
  							<span>缸径(mm)</span>
  							<span>{ engine.cylinderDiameter }</span>
  						</li>
              <li>
  							<span>行程(mm)</span>
  							<span>{ engine.stroke }</span>
  						</li>
              <li>
  							<span>最大马力(Ps)</span>
  							<span>{ engine.maximumHorsepower }</span>
  						</li>
              <li>
  							<span>最大功率(kW)</span>
  							<span>{ engine.maximumPower }</span>
  						</li>
              <li>
  							<span>最大功率转速(rpm)</span>
  							<span>{ engine.maximumPowerSpeed }</span>
  						</li>
              <li>
  							<span>最大扭矩(N·m)</span>
  							<span>{ engine.maxTorque }</span>
  						</li>
              <li>
  							<span>最大扭矩转速(rpm)</span>
  							<span>{ engine.maximumTorqueSpeed }</span>
  						</li>
              <li>
  							<span>发动机特有技术</span>
  							<span>{ engine.engineSpecificTechnology }</span>
  						</li>
              <li>
  							<span>燃料形式</span>
  							<span>{ engine.fuelForm }</span>
  						</li>
              <li>
  							<span>燃油标号</span>
  							<span>{ engine.fuelLabel }</span>
  						</li>
              <li>
  							<span>供油方式</span>
  							<span>{ engine.oilSupplyMode }</span>
  						</li>
              <li>
  							<span>缸盖材料</span>
  							<span>{ engine.cylinderHeadMaterial }</span>
  						</li>
              <li>
  							<span>缸体材料</span>
  							<span>{ engine.cylinderMaterial }</span>
  						</li>
              <li>
  							<span>环保标准</span>
  							<span>{ engine.environmentalStandards }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>电动机</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>电动机总功率(kW)</span>
  							<span>{ motor.motorTotalPower }</span>
  						</li>
              <li>
  							<span>电动机总扭矩(N·m)</span>
  							<span>{ motor.totalMotorTorque }</span>
  						</li>
              <li>
  							<span>前电动机最大功率(kW)</span>
  							<span>{ motor.frontMotorMaximumPower }</span>
  						</li>
              <li>
  							<span>前电动机最大扭矩(N·m)</span>
  							<span>{ motor.frontMaximumTorque }</span>
  						</li>
              <li>
  							<span>后电动机最大功率(kW)</span>
  							<span>{ motor.rearMaximumPower }</span>
  						</li>
              <li>
  							<span>后电动机最大扭矩(N·m)</span>
  							<span>{ motor.rearmaximumTorque }</span>
  						</li>
              <li>
  							<span>工信部续航里程(km)</span>
  							<span>{ motor.MIITMileage }</span>
  						</li>
              <li>
  							<span>电池容量(kWh)</span>
  							<span>{ motor.batteryCapacity }</span>
  						</li>
              <li>
  							<span>电池组质保</span>
  							<span>{ motor.batteryPack }</span>
  						</li>
              <li>
  							<span>电池充电时间</span>
  							<span>{ motor.batteryChargingTime }</span>
  						</li>
              <li>
  							<span>充电桩价格</span>
  							<span>{ motor.chargingPilePrice }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>变速箱</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>简称</span>
  							<span>{ gearbox.abbreviation }</span>
  						</li>
              <li>
  							<span>变速箱类型</span>
  							<span>{ gearbox.gearboxType }</span>
  						</li>
              <li>
  							<span>挡位个数</span>
  							<span>{ gearbox.numberOfBlock }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>底盘转向</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>驱动方式</span>
  							<span>{ chassisSteering.drivingMode }</span>
  						</li>
              <li>
  							<span>四驱形式</span>
  							<span>{ chassisSteering.fourWheelDriveForm }</span>
  						</li>
              <li>
  							<span>中央差速器结构</span>
  							<span>{ chassisSteering.centralDiffStructure }</span>
  						</li>
              <li>
  							<span>前悬架类型</span>
  							<span>{ chassisSteering.frontSuspType }</span>
  						</li>
              <li>
  							<span>后悬架类型</span>
  							<span>{ chassisSteering.rearSuspType }</span>
  						</li>
              <li>
  							<span>助力类型</span>
  							<span>{ chassisSteering.assistType }</span>
  						</li>
              <li>
  							<span>车体结构</span>
  							<span>{ chassisSteering.carBodyStructure }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>车轮制动</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>前制动器类型</span>
  							<span>{ wheelBrake.frontBrakeType }</span>
  						</li>
              <li>
  							<span>后制动器类型</span>
  							<span>{ wheelBrake.rearBrakeType }</span>
  						</li>
              <li>
  							<span>驻车制动类型</span>
  							<span>{ wheelBrake.parkingBrakeType }</span>
  						</li>
              <li>
  							<span>前轮胎规格</span>
  							<span>{ wheelBrake.frontTireSize }</span>
  						</li>
              <li>
  							<span>后轮胎规格</span>
  							<span>{ wheelBrake.rearTireSize }</span>
  						</li>
              <li>
  							<span>备胎规格</span>
  							<span>{ wheelBrake.spareTireSpecifications }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>安全装备</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>主/副驾驶座安全气囊</span>
  							<span>{ safetyEquipment.mainSubDriverSeatAirbag.replace(/&nbsp;/g, ' ') }</span>
  						</li>
              <li>
  							<span>前/后排侧气囊</span>
  							<span>{ safetyEquipment.frontRearSideAirbags.replace(/&nbsp;/g, ' ') }</span>
  						</li>
              <li>
  							<span>前/后排头部气囊(气帘)</span>
  							<span>{ safetyEquipment.frontRearHeadAirbags.replace(/&nbsp;/g, ' ') }</span>
  						</li>
              <li>
  							<span>膝部气囊</span>
  							<span>{ safetyEquipment.kneeAirbag }</span>
  						</li>
              <li>
  							<span>胎压监测装置</span>
  							<span>{ safetyEquipment.tirePressureMonitorDevice }</span>
  						</li>
              <li>
  							<span>零胎压继续行驶</span>
  							<span>{ safetyEquipment.zeroTirePressureTravel }</span>
  						</li>
              <li>
  							<span>安全带未系提示</span>
  							<span>{ safetyEquipment.seatBeltNotPrompted }</span>
  						</li>
              <li>
  							<span>ISOFIX儿童座椅接口</span>
  							<span>{ safetyEquipment.iSOFIXChildSeatInterface }</span>
  						</li>
              <li>
  							<span>发动机电子防盗</span>
  							<span>{ safetyEquipment.engineElectronicAntiTheft }</span>
  						</li>
              <li>
  							<span>车内中控锁</span>
  							<span>{ safetyEquipment.theCarLock }</span>
  						</li>
              <li>
  							<span>遥控钥匙</span>
  							<span>{ safetyEquipment.remoteKey }</span>
  						</li>
              <li>
  							<span>无钥匙启动系统</span>
  							<span>{ safetyEquipment.noKeyStartSystem }</span>
  						</li>
              <li>
  							<span>无钥匙进入系统</span>
  							<span>{ safetyEquipment.noKeyEntrySystem }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>操控配置</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>ABS防抱死</span>
  							<span>{ controlConfiguration.aBSAntiLock }</span>
  						</li>
              <li>
  							<span>制动力分配(EBD/CBC等)</span>
  							<span>{ controlConfiguration.brakeForceDistribution }</span>
  						</li>
              <li>
  							<span>刹车辅助(EBA/BAS/BA等)</span>
  							<span>{ controlConfiguration.brakeAssist }</span>
  						</li>
              <li>
  							<span>牵引力控制(ASR/TCS/TRC等)</span>
  							<span>{ controlConfiguration.tractionControl }</span>
  						</li>
              <li>
  							<span>车身稳定控制(ESC/ESP/DSC等)</span>
  							<span>{ controlConfiguration.bodyStabilityControl }</span>
  						</li>
              <li>
  							<span>上坡辅助</span>
  							<span>{ controlConfiguration.hillAssist }</span>
  						</li>
              <li>
  							<span>自动驻车</span>
  							<span>{ controlConfiguration.autoParking }</span>
  						</li>
              <li>
  							<span>陡坡缓降</span>
  							<span>{ controlConfiguration.slowDownSteepSlope }</span>
  						</li>
              <li>
  							<span>可变悬架</span>
  							<span>{ controlConfiguration.variableSuspension }</span>
  						</li>
              <li>
  							<span>空气悬架</span>
  							<span>{ controlConfiguration.airSuspension }</span>
  						</li>
              <li>
  							<span>可变转向比</span>
  							<span>{ controlConfiguration.variableSteeringRatio }</span>
  						</li>
              <li>
  							<span>前桥限滑差速器/差速锁</span>
  							<span>{ controlConfiguration.frontAxleDifferentialLock }</span>
  						</li>
              <li>
  							<span>中央差速器锁止功能</span>
  							<span>{ controlConfiguration.centralDifferentialLockFunction }</span>
  						</li>
              <li>
  							<span>后桥限滑差速器/差速锁</span>
  							<span>{ controlConfiguration.rearAxleLimitedSlipDifferentialLock }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>外部配置</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>电动天窗</span>
  							<span>{ externalConfiguration.electricSkylight }</span>
  						</li>
              <li>
  							<span>全景天窗</span>
  							<span>{ externalConfiguration.panoramaSunroof }</span>
  						</li>
              <li>
  							<span>运动外观套件</span>
  							<span>{ externalConfiguration.sportAppearancePackage }</span>
  						</li>
              <li>
  							<span>铝合金轮圈</span>
  							<span>{ externalConfiguration.alumAlloyWheels }</span>
  						</li>
              <li>
  							<span>电动吸合门</span>
  							<span>{ externalConfiguration.electricDoorPull }</span>
  						</li>
              <li>
  							<span>侧滑门</span>
  							<span>{ externalConfiguration.slidingDoor }</span>
  						</li>
              <li>
  							<span>电动后备厢</span>
  							<span>{ externalConfiguration.electricTrunk }</span>
  						</li>
              <li>
  							<span>感应后备厢</span>
  							<span>{ externalConfiguration.inductionTrunk }</span>
  						</li>
              <li>
  							<span>车顶行李架</span>
  							<span>{ externalConfiguration.roofLuggageRack }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>内部配置</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>真皮方向盘</span>
  							<span>{ internalConfiguration.leatherSteeringWheel }</span>
  						</li>
              <li>
  							<span>方向盘调节</span>
  							<span>{ internalConfiguration.steeringWheelAdjustment }</span>
  						</li>
              <li>
  							<span>方向盘电动调节</span>
  							<span>{ internalConfiguration.steeringWheelElectricRegulation }</span>
  						</li>
              <li>
  							<span>多功能方向盘</span>
  							<span>{ internalConfiguration.multifunctionSteeringWheel }</span>
  						</li>
              <li>
  							<span>方向盘换挡</span>
  							<span>{ internalConfiguration.steeringWheelShift }</span>
  						</li>
              <li>
  							<span>方向盘加热</span>
  							<span>{ internalConfiguration.steeringWheelHeating }</span>
  						</li>
              <li>
  							<span>方向盘记忆</span>
  							<span>{ internalConfiguration.steeringWheelMemory }</span>
  						</li>
              <li>
  							<span>定速巡航</span>
  							<span>{ internalConfiguration.cruiseControl }</span>
  						</li>
              <li>
  							<span>前/后驻车雷达</span>
  							<span>{ internalConfiguration.frontRearParkingRadar.replace(/&nbsp;/g, ' ') }</span>
  						</li>
              <li>
  							<span>倒车视频影像</span>
  							<span>{ internalConfiguration.reverseVideoImage }</span>
  						</li>
              <li>
  							<span>行车电脑显示屏</span>
  							<span>{ internalConfiguration.drivingComputerDisplayScreen }</span>
  						</li>
              <li>
  							<span>全液晶仪表盘</span>
  							<span>{ internalConfiguration.allLiquidCrystalPanel }</span>
  						</li>
              <li>
  							<span>HUD抬头数字显示</span>
  							<span>{ internalConfiguration.hUDHeaderDigitalDisplay }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>座椅配置</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>座椅材质</span>
  							<span>{ seatConfiguration.seatMaterial }</span>
  						</li>
              <li>
  							<span>运动风格座椅</span>
  							<span>{ seatConfiguration.sportsStyleSeats }</span>
  						</li>
              <li>
  							<span>座椅高低调节</span>
  							<span>{ seatConfiguration.seatHeightAdjustment }</span>
  						</li>
              <li>
  							<span>腰部支撑调节</span>
  							<span>{ seatConfiguration.lumbarSupportAdjustment }</span>
  						</li>
              <li>
  							<span>肩部支撑调节</span>
  							<span>{ seatConfiguration.shoulderSupportAdjustment }</span>
  						</li>
              <li>
  							<span>主/副驾驶座电动调节</span>
  							<span>{ seatConfiguration.mainAuxiliaryDriveSeatElecRegulation }</span>
  						</li>
              <li>
  							<span>第二排靠背角度调节</span>
  							<span>{ seatConfiguration.secondRowBackAngleAdjustment }</span>
  						</li>
              <li>
  							<span>第二排座椅移动</span>
  							<span>{ seatConfiguration.secondSeatMovement }</span>
  						</li>
              <li>
  							<span>后排座椅电动调节</span>
  							<span>{ seatConfiguration.rearSeatElecAdjustment }</span>
  						</li>
              <li>
  							<span>电动座椅记忆</span>
  							<span>{ seatConfiguration.electricSeatMemory }</span>
  						</li>
              <li>
  							<span>前/后排座椅加热</span>
  							<span>{ seatConfiguration.frontRearSeatHeating }</span>
  						</li>
              <li>
  							<span>前/后排座椅通风</span>
  							<span>{ seatConfiguration.frontRearSeatVentilation }</span>
  						</li>
              <li>
  							<span>前/后排座椅按摩</span>
  							<span>{ seatConfiguration.frontRearSeatMassage }</span>
  						</li>
              <li>
  							<span>第三排座椅</span>
  							<span>{ seatConfiguration.thirdRowsOfSeats }</span>
  						</li>
              <li>
  							<span>后排座椅放倒方式</span>
  							<span>{ seatConfiguration.rearSeatsReclineWay }</span>
  						</li>
              <li>
  							<span>前/后中央扶手</span>
  							<span>{ seatConfiguration.frontRearCentralRail }</span>
  						</li>
              <li>
  							<span>后排杯架</span>
  							<span>{ seatConfiguration.rearCupHolder }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>多媒体配置</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>GPS导航系统</span>
  							<span>{ multimediaConfiguration.gPSNavigationSystem }</span>
  						</li>
              <li>
  							<span>定位互动服务</span>
  							<span>{ multimediaConfiguration.positioningInteractiveServices }</span>
  						</li>
              <li>
  							<span>中控台彩色大屏</span>
  							<span>{ multimediaConfiguration.centralControlDeskColorLargeScreen }</span>
  						</li>
              <li>
  							<span>蓝牙/车载电话</span>
  							<span>{ multimediaConfiguration.bluetoothMobilePhone }</span>
  						</li>
              <li>
  							<span>车载电视</span>
  							<span>{ multimediaConfiguration.carTV }</span>
  						</li>
              <li>
  							<span>后排液晶屏</span>
  							<span>{ multimediaConfiguration.rearLCDScreen }</span>
  						</li>
              <li>
  							<span>220V/230V电源</span>
  							<span>{ multimediaConfiguration.powerSupply220Or230 }</span>
  						</li>
              <li>
  							<span>外接音源接口</span>
  							<span>{ multimediaConfiguration.externalAudioInterface }</span>
  						</li>
              <li>
  							<span>CD支持MP3/WMA</span>
  							<span>{ multimediaConfiguration.cDSupportMP3OrWMA }</span>
  						</li>
              <li>
  							<span>多媒体系统</span>
  							<span>{ multimediaConfiguration.multimediaSystem }</span>
  						</li>
              <li>
  							<span>扬声器品牌</span>
  							<span>{ multimediaConfiguration.speakerBrand }</span>
  						</li>
              <li>
  							<span>扬声器数量</span>
  							<span>{ multimediaConfiguration.numberOfSpeakers }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>灯光配置</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>近光灯</span>
  							<span>{ lightingConfiguration.dippedHeadlight }</span>
  						</li>
              <li>
  							<span>远光灯</span>
  							<span>{ lightingConfiguration.highBeam }</span>
  						</li>
              <li>
  							<span>日间行车灯</span>
  							<span>{ lightingConfiguration.drl }</span>
  						</li>
              <li>
  							<span>自适应远近光</span>
  							<span>{ lightingConfiguration.adaptiveFarNearLight }</span>
  						</li>
              <li>
  							<span>自动头灯</span>
  							<span>{ lightingConfiguration.autoHeadlights }</span>
  						</li>
              <li>
  							<span>转向辅助灯</span>
  							<span>{ lightingConfiguration.steeringAssistLamp }</span>
  						</li>
              <li>
  							<span>转向头灯</span>
  							<span>{ lightingConfiguration.turnHeadlights }</span>
  						</li>
              <li>
  							<span>前雾灯</span>
  							<span>{ lightingConfiguration.frontFogLamp }</span>
  						</li>
              <li>
  							<span>大灯高度可调</span>
  							<span>{ lightingConfiguration.headlightHeightAdjustable }</span>
  						</li>
              <li>
  							<span>大灯清洗装置</span>
  							<span>{ lightingConfiguration.headlightCleaningDevice }</span>
  						</li>
              <li>
  							<span>车内氛围灯</span>
  							<span>{ lightingConfiguration.interiorAirLamp }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>玻璃/后视镜</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>前/后电动车窗</span>
  							<span>{ glassMirror.frontRearPowerWindow.replace(/&nbsp;/g, ' ') }</span>
  						</li>
              <li>
  							<span>车窗防夹手功能</span>
  							<span>{ glassMirror.windowAntiPinch }</span>
  						</li>
              <li>
  							<span>防紫外线/隔热玻璃</span>
  							<span>{ glassMirror.uVHeatInsulationGlass }</span>
  						</li>
              <li>
  							<span>后视镜电动调节</span>
  							<span>{ glassMirror.rearviewElecControl }</span>
  						</li>
              <li>
  							<span>后视镜加热</span>
  							<span>{ glassMirror.rearviewHeating }</span>
  						</li>
              <li>
  							<span>内/外后视镜自动防眩目</span>
  							<span>{ glassMirror.inOutRearviewAutoAntiGlare }</span>
  						</li>
              <li>
  							<span>后视镜电动折叠</span>
  							<span>{ glassMirror.elecFoldingRearview }</span>
  						</li>
              <li>
  							<span>后视镜记忆</span>
  							<span>{ glassMirror.rearviewMemory }</span>
  						</li>
              <li>
  							<span>后风挡遮阳帘</span>
  							<span>{ glassMirror.sunShade }</span>
  						</li>
              <li>
  							<span>后排侧遮阳帘</span>
  							<span>{ glassMirror.rearSideSunShade }</span>
  						</li>
              <li>
  							<span>后排侧隐私玻璃</span>
  							<span>{ glassMirror.rearSidePrivacyGlass }</span>
  						</li>
              <li>
  							<span>遮阳板化妆镜</span>
  							<span>{ glassMirror.sunShadingboardCosmeticMirror }</span>
  						</li>
              <li>
  							<span>后雨刷</span>
  							<span>{ glassMirror.rearWiper }</span>
  						</li>
              <li>
  							<span>感应雨刷</span>
  							<span>{ glassMirror.sensingWipers }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>空调/冰箱</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>空调控制方式</span>
  							<span>{ airConditioningRefrigerator.airConditioningControlMode }</span>
  						</li>
              <li>
  							<span>后排独立空调</span>
  							<span>{ airConditioningRefrigerator.rearIndependentAirConditioning }</span>
  						</li>
              <li>
  							<span>后座出风口</span>
  							<span>{ airConditioningRefrigerator.rearAirOutlet }</span>
  						</li>
              <li>
  							<span>温度分区控制</span>
  							<span>{ airConditioningRefrigerator.temperatureZoneControl }</span>
  						</li>
              <li>
  							<span>车内空气调节/花粉过滤</span>
  							<span>{ airConditioningRefrigerator.airConditioningPollenFiltration }</span>
  						</li>
              <li>
  							<span>车载冰箱</span>
  							<span>{ airConditioningRefrigerator.vehicleMountedRefrigerator }</span>
  						</li>
  					</ul>
  				</li>
          <li>
            <div>
    					<p>高科技配置</p>
    					<p>注：<span></span>标配<span></span>选配-无</p>
            </div>
  					<ul>
  						<li>
  							<span>自动泊车入位</span>
  							<span>{ highTechConfiguration.automaticParking }</span>
  						</li>
              <li>
  							<span>发动机启停技术</span>
  							<span>{ highTechConfiguration.engineStartStopTechnology }</span>
  						</li>
              <li>
  							<span>并线辅助</span>
  							<span>{ highTechConfiguration.auxiliary }</span>
  						</li>
              <li>
  							<span>车道偏离预警系统</span>
  							<span>{ highTechConfiguration.ldws }</span>
  						</li>
              <li>
  							<span>主动刹车/主动安全系统</span>
  							<span>{ highTechConfiguration.activeBrakeSafetySystem }</span>
  						</li>
              <li>
  							<span>整体主动转向系统</span>
  							<span>{ highTechConfiguration.integratedActiveSteeringSystem }</span>
  						</li>
              <li>
  							<span>夜视系统</span>
  							<span>{ highTechConfiguration.nightVisionSystem }</span>
  						</li>
              <li>
  							<span>中控液晶屏分屏显示</span>
  							<span>{ highTechConfiguration.lCDScreenInControlPanelDisplay }</span>
  						</li>
              <li>
  							<span>自适应巡航</span>
  							<span>{ highTechConfiguration.adaptiveCruiseControl }</span>
  						</li>
              <li>
  							<span>全景摄像头</span>
  							<span>{ highTechConfiguration.panoramicCamera }</span>
  						</li>
  					</ul>
  				</li>
  			</ul>
  		</div>
  	)
  }
}
