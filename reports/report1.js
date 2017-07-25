<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<StiSerializer version="1.02" type="Net" application="StiReport">
  <Culture>de</Culture>
  <Dictionary Ref="1" type="Dictionary" isKey="true">
    <BusinessObjects isList="true" count="0" />
    <Databases isList="true" count="0" />
    <DataSources isList="true" count="1">
      <ServiceDispo Ref="2" type="DataTableSource" isKey="true">
        <Alias>ServiceDispo</Alias>
        <Columns isList="true" count="5">
          <value>servicedispo_servicedispono,System.String</value>
          <value>servicedispo_description,System.String</value>
          <value>employee_name1,System.String</value>
          <value>employee_name2,System.String</value>
          <value>employee_picture,System.String</value>
          <value>image,System.String</value>
          <value>image2,System.String</value>
        </Columns>
        <Dictionary isRef="1" />
        <Name>ServiceDispo</Name>
        <NameInSource>ServiceDispo.ServiceDispo</NameInSource>
      </ServiceDispo>
    </DataSources>
    <Relations isList="true" count="0" />
    <Report isRef="0" />
    <Variables isList="true" count="9">
      <value>Parameter,p_servicedispo_servicedispo,p_servicedispo_servicedispo,,System.String,_x0031_,False,False,False,False</value>
      <value>System_x0020_Parameter,p_division,p_division,,System.String,_x0031_,False,False,False,False</value>
      <value>System_x0020_Parameter,p_blueprint,p_blueprint,,System.String,_x0030_,False,False,False,False</value>
      <value>System_x0020_Parameter,p_richtext,p_richtext,,System.String,_x0031_,False,False,False,False</value>
      <value>System_x0020_Parameter,p_overlay,p_overlay,,System.String,_x0031_,False,False,False,False</value>
      <value>System_x0020_Parameter,p_idoc,p_idoc,,System.String,_x005C__x005C_hz-erp_x005C_StepsBusinessSolution_x005C_Share_x005C_IDoc_x005C_,False,False,False,False</value>
      <value>System_x0020_Parameter,p_language,p_language,,System.String,_x0031_,False,False,False,False</value>
      <value>System_x0020_Parameter,p_culture,p_culture,,System.String,de,False,False,False,False</value>
      <value>System_x0020_Parameter,p_export_word,p_export_word,,System.String,_x0030_,False,False,False,False</value>
    </Variables>
  </Dictionary>
  <EngineVersion>EngineV2</EngineVersion>
  <GlobalizationStrings isList="true" count="0" />
  <MetaTags isList="true" count="0" />
  <Pages isList="true" count="1">
    <Page1 Ref="3" type="Page" isKey="true">
      <Border>None;Black;2;Solid;False;4;Black</Border>
      <Brush>Transparent</Brush>
      <Components isList="true" count="4">
        <PageHeaderBand1 Ref="4" type="PageHeaderBand" isKey="true">
          <Brush>Transparent</Brush>
          <ClientRectangle>0,0.4,19,0.6</ClientRectangle>
          <Components isList="true" count="1">
            <Text1 Ref="5" type="Text" isKey="true">
              <Brush>EmptyBrush</Brush>
              <ClientRectangle>0,0,19,0.6</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,9</Font>
              <Margins>0,0,0,0</Margins>
              <Name>Text1</Name>
              <Page isRef="3" />
              <Parent isRef="4" />
              <Text>{PageNofM}</Text>
              <TextBrush>[0:124:197]</TextBrush>
              <Type>Expression</Type>
            </Text1>
          </Components>
          <Conditions isList="true" count="0" />
          <Name>PageHeaderBand1</Name>
          <Page isRef="3" />
          <Parent isRef="3" />
        </PageHeaderBand1>
        <ReportTitleBand1 Ref="6" type="ReportTitleBand" isKey="true">
          <Brush>Transparent</Brush>
          <ClientRectangle>0,1.8,19,1.8</ClientRectangle>
          <Components isList="true" count="3">
            <Text2 Ref="7" type="Text" isKey="true">
              <Brush>EmptyBrush</Brush>
              <ClientRectangle>0,0.2,19,0.6</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,11,Bold</Font>
              <Guid>e7499073f2e94bd5adcdc4029ddac648</Guid>
              <HorAlignment>Center</HorAlignment>
              <Margins>0,0,0,0</Margins>
              <Name>Text2</Name>
              <Page isRef="3" />
              <Parent isRef="6" />
              <Text>Servicebericht zur Service Disposition {ServiceDispo.servicedispo_servicedispono}</Text>
              <TextBrush>[0:124:197]</TextBrush>
              <Type>Expression</Type>
            </Text2>
            <Text3 Ref="8" type="Text" isKey="true">
              <Brush>EmptyBrush</Brush>
              <ClientRectangle>0,1.4,19,0.6</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,9</Font>
              <Guid>6fdd3bc357b5422bb8a20d1a9af85769</Guid>
              <Margins>0,0,0,0</Margins>
              <Name>Text3</Name>
              <Page isRef="3" />
              <Parent isRef="6" />
              <Text>Beschreibung: {ServiceDispo.servicedispo_description}</Text>
              <TextBrush>[0:124:197]</TextBrush>
              <Type>Expression</Type>
            </Text3>
            <BarCode1 Ref="9" type="Stimulsoft.Report.BarCodes.StiBarCode" isKey="true">
              <BackColor>White</BackColor>
              <BarCodeType Ref="10" type="Stimulsoft.Report.BarCodes.StiCode128AutoBarCodeType" isKey="true" />
              <ClientRectangle>14,0.8,3.2,1</ClientRectangle>
              <Code>0123456789012</Code>
              <Conditions isList="true" count="0" />
              <Font>Arial,8,Bold,Pixel</Font>
              <ForeColor>Black</ForeColor>
              <Name>BarCode1</Name>
              <Page isRef="3" />
              <Parent isRef="6" />
            </BarCode1>
          </Components>
          <Conditions isList="true" count="0" />
          <Name>ReportTitleBand1</Name>
          <Page isRef="3" />
          <Parent isRef="3" />
        </ReportTitleBand1>
        <DataBand1 Ref="11" type="DataBand" isKey="true">
          <Brush>Transparent</Brush>
          <BusinessObjectGuid isNull="true" />
          <ClientRectangle>0,4.4,19,0.6</ClientRectangle>
          <Components isList="true" count="1">
            <Text4 Ref="12" type="Text" isKey="true">
              <Brush>EmptyBrush</Brush>
              <ClientRectangle>0,0,19,0.6</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,9</Font>
              <Guid>cfa354c2b5b646a38fd85b057a5983d9</Guid>
              <Margins>0,0,0,0</Margins>
              <Name>Text4</Name>
              <Page isRef="3" />
              <Parent isRef="11" />
              <Text>Mitarbeiter: {ServiceDispo.employee_name2} {ServiceDispo.employee_name1}</Text>
              <TextBrush>Black</TextBrush>
              <Type>Expression</Type>
            </Text4>
          </Components>
          <Conditions isList="true" count="0" />
          <DataRelationName isNull="true" />
          <DataSourceName>ServiceDispo</DataSourceName>
          <Filters isList="true" count="0" />
          <Name>DataBand1</Name>
          <Page isRef="3" />
          <Parent isRef="3" />
          <Sort isList="true" count="0" />
        </DataBand1>
        <ReportSummaryBand1 Ref="13" type="ReportSummaryBand" isKey="true">
          <Brush>Transparent</Brush>
          <ClientRectangle>0,5.8,19,3.4</ClientRectangle>
          <Components isList="true" count="7">
            <CheckBox1 Ref="14" type="CheckBox" isKey="true">
              <Brush>EmptyBrush</Brush>
              <Checked>True</Checked>
              <ClientRectangle>0.4,0.4,0.4,0.4</ClientRectangle>
              <Conditions isList="true" count="0" />
              <ContourColor>Black</ContourColor>
              <Editable>True</Editable>
              <Name>CheckBox1</Name>
              <Page isRef="3" />
              <Parent isRef="13" />
              <TextBrush>Black</TextBrush>
            </CheckBox1>
            <Text5 Ref="15" type="Text" isKey="true">
              <Brush>EmptyBrush</Brush>
              <ClientRectangle>1,0.4,3.2,0.4</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,9</Font>
              <Guid>6337d1c81be7463fb5d633957b36926c</Guid>
              <Margins>0,0,0,0</Margins>
              <Name>Text5</Name>
              <Page isRef="3" />
              <Parent isRef="13" />
              <Text>Alles ok</Text>
              <TextBrush>Black</TextBrush>
              <Type>Expression</Type>
            </Text5>
            <Text6 Ref="16" type="Text" isKey="true">
              <Border>Top;Black;1;Solid;False;4;Black</Border>
              <Brush>EmptyBrush</Brush>
              <ClientRectangle>0.4,2.8,4,0.4</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,9</Font>
              <Guid>2900436c00354d63b30d1195788d4293</Guid>
              <Margins>0,0,0,0</Margins>
              <Name>Text6</Name>
              <Page isRef="3" />
              <Parent isRef="13" />
              <Text>Unterschrift</Text>
              <TextBrush>Black</TextBrush>
              <Type>Expression</Type>
            </Text6>
            <Chart1 Ref="17" type="Stimulsoft.Report.Chart.StiChart" isKey="true">
              <Area Ref="18" type="Stimulsoft.Report.Chart.StiFullStackedColumnArea" isKey="true">
                <BorderColor>171, 172, 173</BorderColor>
                <Brush>White</Brush>
                <Chart isRef="17" />
                <GridLinesHor Ref="19" type="Stimulsoft.Report.Chart.StiGridLinesHor" isKey="true">
                  <Area isRef="18" />
                  <Color>100, 105, 105, 105</Color>
                  <MinorColor>100, 105, 105, 105</MinorColor>
                </GridLinesHor>
                <GridLinesHorRight Ref="20" type="Stimulsoft.Report.Chart.StiGridLinesHor" isKey="true">
                  <Area isRef="18" />
                  <Color>Silver</Color>
                  <MinorColor>Gainsboro</MinorColor>
                  <Visible>False</Visible>
                </GridLinesHorRight>
                <GridLinesVert Ref="21" type="Stimulsoft.Report.Chart.StiGridLinesVert" isKey="true">
                  <Area isRef="18" />
                  <Color>100, 105, 105, 105</Color>
                  <MinorColor>100, 105, 105, 105</MinorColor>
                </GridLinesVert>
                <InterlacingHor Ref="22" type="Stimulsoft.Report.Chart.StiInterlacingHor" isKey="true">
                  <Area isRef="18" />
                  <InterlacedBrush>[10:155:155:155]</InterlacedBrush>
                </InterlacingHor>
                <InterlacingVert Ref="23" type="Stimulsoft.Report.Chart.StiInterlacingVert" isKey="true">
                  <Area isRef="18" />
                  <InterlacedBrush>[10:155:155:155]</InterlacedBrush>
                </InterlacingVert>
                <XAxis Ref="24" type="Stimulsoft.Report.Chart.StiXBottomAxis" isKey="true">
                  <Area isRef="18" />
                  <DateTimeStep Ref="25" type="Stimulsoft.Report.Chart.StiAxisDateTimeStep" isKey="true" />
                  <Interaction Ref="26" type="Stimulsoft.Report.Chart.StiAxisInteraction" isKey="true" />
                  <Labels Ref="27" type="Stimulsoft.Report.Chart.StiAxisLabels" isKey="true">
                    <Color>140, 140, 140</Color>
                    <Font>Tahoma,8</Font>
                  </Labels>
                  <LineColor>140, 140, 140</LineColor>
                  <Range Ref="28" type="Stimulsoft.Report.Chart.StiAxisRange" isKey="true" />
                  <Ticks Ref="29" type="Stimulsoft.Report.Chart.StiAxisTicks" isKey="true" />
                  <Title Ref="30" type="Stimulsoft.Report.Chart.StiAxisTitle" isKey="true">
                    <Color>140, 140, 140</Color>
                    <Font>Tahoma,12,Bold</Font>
                  </Title>
                </XAxis>
                <XTopAxis Ref="31" type="Stimulsoft.Report.Chart.StiXTopAxis" isKey="true">
                  <Area isRef="18" />
                  <Interaction Ref="32" type="Stimulsoft.Report.Chart.StiAxisInteraction" isKey="true" />
                  <Labels Ref="33" type="Stimulsoft.Report.Chart.StiAxisLabels" isKey="true">
                    <Color>140, 140, 140</Color>
                    <Font>Tahoma,8</Font>
                  </Labels>
                  <LineColor>140, 140, 140</LineColor>
                  <Ticks Ref="34" type="Stimulsoft.Report.Chart.StiAxisTicks" isKey="true" />
                  <Title Ref="35" type="Stimulsoft.Report.Chart.StiAxisTitle" isKey="true">
                    <Color>140, 140, 140</Color>
                    <Font>Tahoma,12,Bold</Font>
                  </Title>
                </XTopAxis>
                <YAxis Ref="36" type="Stimulsoft.Report.Chart.StiYLeftAxis" isKey="true">
                  <Area isRef="18" />
                  <Interaction Ref="37" type="Stimulsoft.Report.Chart.StiAxisInteraction" isKey="true" />
                  <Labels Ref="38" type="Stimulsoft.Report.Chart.StiAxisLabels" isKey="true">
                    <Color>140, 140, 140</Color>
                    <Font>Tahoma,8</Font>
                  </Labels>
                  <LineColor>140, 140, 140</LineColor>
                  <Range Ref="39" type="Stimulsoft.Report.Chart.StiAxisRange" isKey="true" />
                  <Ticks Ref="40" type="Stimulsoft.Report.Chart.StiAxisTicks" isKey="true" />
                  <Title Ref="41" type="Stimulsoft.Report.Chart.StiAxisTitle" isKey="true">
                    <Color>140, 140, 140</Color>
                    <Direction>BottomToTop</Direction>
                    <Font>Tahoma,12,Bold</Font>
                  </Title>
                </YAxis>
                <YRightAxis Ref="42" type="Stimulsoft.Report.Chart.StiYRightAxis" isKey="true">
                  <Area isRef="18" />
                  <Interaction Ref="43" type="Stimulsoft.Report.Chart.StiAxisInteraction" isKey="true" />
                  <Labels Ref="44" type="Stimulsoft.Report.Chart.StiAxisLabels" isKey="true">
                    <Color>140, 140, 140</Color>
                    <Font>Tahoma,8</Font>
                    <TextAlignment>Left</TextAlignment>
                  </Labels>
                  <LineColor>140, 140, 140</LineColor>
                  <Range Ref="45" type="Stimulsoft.Report.Chart.StiAxisRange" isKey="true" />
                  <Ticks Ref="46" type="Stimulsoft.Report.Chart.StiAxisTicks" isKey="true" />
                  <Title Ref="47" type="Stimulsoft.Report.Chart.StiAxisTitle" isKey="true">
                    <Color>140, 140, 140</Color>
                    <Direction>TopToBottom</Direction>
                    <Font>Tahoma,12,Bold</Font>
                  </Title>
                </YRightAxis>
              </Area>
              <Border>None;Black;0;Solid;False;4;Black</Border>
              <Brush>EmptyBrush</Brush>
              <ClientRectangle>5.2,0.4,5.2,2.4</ClientRectangle>
              <Conditions isList="true" count="0" />
              <ConstantLines isList="true" count="0" />
              <CustomStyleName />
              <Filters isList="true" count="0" />
              <IsAnimation>False</IsAnimation>
              <Legend Ref="48" type="Stimulsoft.Report.Chart.StiLegend" isKey="true">
                <BorderColor>225, 225, 225</BorderColor>
                <Brush>[255:255:255]</Brush>
                <Chart isRef="17" />
                <Font>Arial,8</Font>
                <LabelsColor>140, 140, 140</LabelsColor>
                <MarkerSize>10, 10</MarkerSize>
                <ShowShadow>False</ShowShadow>
                <TitleColor>105, 105, 105</TitleColor>
                <TitleFont>Arial,14,Bold</TitleFont>
              </Legend>
              <Name>Chart1</Name>
              <Page isRef="3" />
              <Parent isRef="13" />
              <Series isList="true" count="1">
                <Item16 Ref="49" type="Stimulsoft.Report.Chart.StiFullStackedColumnSeries" isKey="true">
                  <BorderColor>255, 255, 255</BorderColor>
                  <Brush>[112:173:71]</Brush>
                  <BrushNegative>Firebrick</BrushNegative>
                  <Chart isRef="17" />
                  <Conditions isList="true" count="0" />
                  <Filters isList="true" count="0" />
                  <SeriesLabels Ref="50" type="Stimulsoft.Report.Chart.StiCenterAxisLabels" isKey="true">
                    <BorderColor>Transparent</BorderColor>
                    <Brush>Transparent</Brush>
                    <Chart isRef="17" />
                    <Font>Arial,10</Font>
                    <LabelColor>51, 71, 91</LabelColor>
                    <MarkerSize>8, 6</MarkerSize>
                    <ValueTypeSeparator>-</ValueTypeSeparator>
                    <Width>0</Width>
                  </SeriesLabels>
                  <ShowShadow>False</ShowShadow>
                  <Title>Reihen 1</Title>
                  <TopN Ref="51" type="Stimulsoft.Report.Chart.StiSeriesTopN" isKey="true" />
                </Item16>
              </Series>
              <SeriesLabels Ref="52" type="Stimulsoft.Report.Chart.StiCenterAxisLabels" isKey="true">
                <BorderColor>Transparent</BorderColor>
                <Brush>Transparent</Brush>
                <Chart isRef="17" />
                <Font>Arial,10</Font>
                <LabelColor>51, 71, 91</LabelColor>
                <MarkerSize>8, 6</MarkerSize>
                <ValueTypeSeparator>-</ValueTypeSeparator>
                <Width>0</Width>
              </SeriesLabels>
              <SeriesLabelsConditions isList="true" count="0" />
              <Sort isList="true" count="0" />
              <Strips isList="true" count="0" />
              <Style Ref="53" type="Stimulsoft.Report.Chart.StiStyle25" isKey="true">
                <Conditions isList="true" count="0" />
                <Name />
              </Style>
              <Table Ref="54" type="Stimulsoft.Report.Chart.StiChartTable" isKey="true">
                <DataCells Ref="55" type="Stimulsoft.Report.Chart.StiChartTableDataCells" isKey="true">
                  <Font>Arial,8</Font>
                  <ShrinkFontToFit>False</ShrinkFontToFit>
                  <TextColor>140, 140, 140</TextColor>
                </DataCells>
                <GridLineColor>225, 225, 225</GridLineColor>
                <Header Ref="56" type="Stimulsoft.Report.Chart.StiChartTableHeader" isKey="true">
                  <Brush>White</Brush>
                  <Font>Arial,8</Font>
                  <TextColor>DarkGray</TextColor>
                </Header>
              </Table>
              <Title Ref="57" type="Stimulsoft.Report.Chart.StiChartTitle" isKey="true">
                <Brush>[140:140:140]</Brush>
                <Font>Tahoma,12,Bold</Font>
              </Title>
            </Chart1>
            <Image2 Ref="58" type="Image" isKey="true">
              <Brush>EmptyBrush</Brush>
              <ClientRectangle>11.2,0.4,2.2,2.4</ClientRectangle>
              <Conditions isList="true" count="0" />
              <DataColumn>ServiceDispo.image2</DataColumn>
              <Margins>0,0,0,0</Margins>
              <Name>Image2</Name>
              <Page isRef="3" />
              <Parent isRef="13" />
            </Image2>
            <Text7 Ref="59" type="Text" isKey="true">
              <Brush>EmptyBrush</Brush>
              <ClientRectangle>0.4,1,4,1.6</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Editable>True</Editable>
              <Font>Arial,11,Bold</Font>
              <Margins>0,0,0,0</Margins>
              <Name>Text7</Name>
              <Page isRef="3" />
              <Parent isRef="13" />
              <TextBrush>Black</TextBrush>
              <Type>Expression</Type>
            </Text7>
            <Image1 Ref="60" type="Image" isKey="true">
              <DataColumn>ServiceDispo.image</DataColumn>
              <Border>None;[31:73:125];1;DashDot;False;4;Black</Border>
              <Brush>Transparent</Brush>
              <ClientRectangle>13.6,0.4,1.8,2.4</ClientRectangle>
              <Conditions isList="true" count="0" />
              <!--<Image>{ServiceDispo.image}</Image>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAWCAYAAABHXJdFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+xJREFUeNrsWr9rFEEUngtBEGxWEGIjeEmjpFD2sLXZEwsrYVNESHlpLGxkUwgqCN5haZVrRIJpThQsLMz9A4KLgkErVwgIQsBFEASb+AbfkMc4uztzO/sjMB88bm93Z3bme2/ee/N2OwtP9w5YMdYuJp+34PcUyFuQsxptOq/vXWEODnmY07hnC42P45mm8Tk4WDHAXyC38HgVpO8oc6jTAIfg/X7g8W1Hl4NtzBdc38bfBZALNh+8vLxM/w5AQhAfJAWJQaYgE/wvEPFFofmIPvYht+tI99FrGyCjjP74GDcz7gtAdjL6F9jB+6aKSHKg8fysMenwxhRzDrBdgu1GeJx1/1CTbyMd5Rngb5CvxACrglCMgAfSRWIjnFhS04Ic5BhA1DLnMQtvHrbzyTkfJcQFMG6LBzwOcgLzwO8VKlyQOMYV5OG5EM9TEie4WgVC7IMpvEo8w3i62J+shBCvtQWmvKmMT3hLH9t56OETEjmyPJ0K8Sw6KgrBV0GeowF+sB2GCVl8wOvk/JiQQpFIxNKVPLU0pkhhgIOWeT9T3sQc/IxQ76NxCiNczHl2Ec9GOirahDx83z13DI8fVUiopyBN5DJ1oysZXCCFujbBhLeIXB8pvNcGmX/Yll3wEhnYNkm0bSElk36HJPkNKnSsyPci6VobYMob9YrjgrmzOnWgU4i+D15wFY9vgOxZfP5IInOIhH5BUr2aFTsiYwkk79cmAzTlzdfMjacaBnigkKBKA+R4AkbIB7UPcg3kpyUiORk9VG4qhcEhyUvqQiJ5QRq2dDc1dWxW2sYbq9oAeR74AozwJPx+BFmzrHSeSPO+VyRS/QY2ACNF7mdSm+vWuFh0eYs1w2ug4SX7ComrNkCOM+zwbcgrdliktokJktpXkNKEFxTeT2fnl6dgT1O5VfEWa/A5yJiPKkzLktZhgBw30Qty3LFU8lDlLDFrFhOFR9QtPag2BEPLczPlLSWLaqCIKj4ZY1JnvjtveD8vTF8Gecn+vSX5BHK+RAkhIr8TokS/YWOcEiXo1he5oW6yw4KvCImB5P0mBeE7KNggzMrbBpZXRK0vxD675DwjVY9WGiAHfS23X7KGlSBpXkaulxrmXzaxPkMJR+ReHvv/1V2q0ecgJ+ftlOQtxRC9Q1KCQDHnWmuvczO0oa/llkrmWj2c9DRDob0y+UVDRrsizUeEtEVL3rwMbzGOg354kKLR9ZooNXU0v4gW+ANyGj/R4qvpTV7feV9ES1/DUK/IjpjRtQFHljfTEDwm3wc+KPPg3d3drGTZwRxHljeTEPwN5C7JVS45vTvUZYA89F5H78eT38eOOgcb+CvAADpXI7XwMCiSAAAAAElFTkSuQmCC -->
              <Margins>0,0,0,0</Margins>
              <Name>Image1</Name>
              <Page isRef="3" />
              <Parent isRef="13" />
            </Image1>
          </Components>
          <Conditions isList="true" count="0" />
          <Name>ReportSummaryBand1</Name>
          <Page isRef="3" />
          <Parent isRef="3" />
        </ReportSummaryBand1>
      </Components>
      <Conditions isList="true" count="0" />
      <Guid>1139987b16eb4b348cb809d36d14e281</Guid>
      <Margins>1,1,1,1</Margins>
      <Name>Page1</Name>
      <PageHeight>29.7</PageHeight>
      <PageWidth>21</PageWidth>
      <Report isRef="0" />
      <Watermark Ref="61" type="Stimulsoft.Report.Components.StiWatermark" isKey="true">
        <Font>Arial,100</Font>
        <TextBrush>[50:0:0:0]</TextBrush>
      </Watermark>
    </Page1>
  </Pages>
  <PreviewMode>StandardAndDotMatrix</PreviewMode>
  <PreviewSettings>268435455</PreviewSettings>
  <PrinterSettings Ref="62" type="Stimulsoft.Report.Print.StiPrinterSettings" isKey="true" />
  <ReferencedAssemblies isList="true" count="8">
    <value>System.Dll</value>
    <value>System.Drawing.Dll</value>
    <value>System.Windows.Forms.Dll</value>
    <value>System.Data.Dll</value>
    <value>System.Xml.Dll</value>
    <value>Stimulsoft.Controls.Dll</value>
    <value>Stimulsoft.Base.Dll</value>
    <value>Stimulsoft.Report.Dll</value>
  </ReferencedAssemblies>
  <ReportAlias>report1</ReportAlias>
  <ReportChanged>11/2/2016 4:49:09 PM</ReportChanged>
  <ReportCreated>11/2/2016 3:13:01 PM</ReportCreated>
  <ReportFile>report1.mrt</ReportFile>
  <ReportGuid>33b3b1a4ecd94df0be6e06ca9aaaa635</ReportGuid>
  <ReportName>report1</ReportName>
  <ReportUnit>Centimeters</ReportUnit>
  <ReportVersion>2016.1.0</ReportVersion>
  <Script>using System;
using System.Drawing;
using System.Windows.Forms;
using System.Data;
using Stimulsoft.Controls;
using Stimulsoft.Base.Drawing;
using Stimulsoft.Report;
using Stimulsoft.Report.Dialogs;
using Stimulsoft.Report.Components;

namespace Reports
{
    public class report1 : Stimulsoft.Report.StiReport
    {
        public report1()        {
            this.InitializeComponent();
        }

        #region StiReport Designer generated code - do not modify
		#endregion StiReport Designer generated code - do not modify
    }
}
</Script>
  <ScriptLanguage>CSharp</ScriptLanguage>
  <Styles isList="true" count="0" />
</StiSerializer>
