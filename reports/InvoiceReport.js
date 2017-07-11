<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<StiSerializer version="1.02" type="Net" application="StiReport">
  <Dictionary Ref="1" type="Dictionary" isKey="true">
    <BusinessObjects isList="true" count="0" />
    <Databases isList="true" count="1">
      <OleDbConnection Ref="2" type="Stimulsoft.Report.Dictionary.StiOleDbDatabase" isKey="true">
        <Alias>OleDbConnection</Alias>
        <ConnectionStringEncrypted>4Gz7AsVUQ91vXdGo8lzgF8I0y+tZUQmBy2H58fT48y/2MNmhT2qpRUZsXdxnTOcX9HD768ZZ+on5ELnxZAQoe4R4zStiS+Pd+WKx8ccYIHPVyKsJ3mipOWoYzcTqhCWXwwqPDUUO2cXiQaWAZyzha8QUs0hLf/P9a3ToycMEYvf5yNUrxmTrkA==</ConnectionStringEncrypted>
        <Name>OleDbConnection</Name>
      </OleDbConnection>
    </Databases>
    <DataSources isList="true" count="1">
      <ds Ref="3" type="Stimulsoft.Report.Dictionary.StiOleDbSource" isKey="true">
        <Alias>ds</Alias>
        <Columns isList="true" count="10">
          <value>OrderDate,System.String</value>
          <value>OrderID,System.String</value>
          <value>City,System.String</value>
          <value>BillingAddress,System.String</value>
          <value>ShippingAddress,System.String</value>
          <value>Quantity,System.String</value>
          <value>ProductName,System.String</value>
          <value>UnitPrice,System.String</value>
          <value>Total,System.String</value>
          <value>Freight,System.String</value>
        </Columns>
        <CommandTimeout>30</CommandTimeout>
        <Dictionary isRef="1" />
        <Name>ds</Name>
        <NameInSource>OleDbConnection</NameInSource>
        <Parameters isList="true" count="0" />
        <SqlCommand>SELECT * FROM Invoices WHERE Country = "USA"</SqlCommand>
      </ds>
    </DataSources>
    <Relations isList="true" count="0" />
    <Report isRef="0" />
    <Resources isList="true" count="0" />
    <Variables isList="true" count="0" />
  </Dictionary>
  <EngineVersion>EngineV2</EngineVersion>
  <GlobalizationStrings isList="true" count="0" />
  <MetaTags isList="true" count="0" />
  <Pages isList="true" count="1">
    <Page1 Ref="4" type="Page" isKey="true">
      <Border>None;Black;2;Solid;False;4;Black</Border>
      <Brush>Transparent</Brush>
      <Components isList="true" count="6">
        <line3 Ref="5" type="VerticalLinePrimitive" isKey="true">
          <ClientRectangle>550,71.4,1,39.6</ClientRectangle>
          <Color>169, 169, 169</Color>
          <EndCap Ref="6" type="Cap" isKey="true">
            <Color>Black</Color>
          </EndCap>
          <Guid>de617d5f14ac42128ca76596732287f7</Guid>
          <Linked>True</Linked>
          <Name>line3</Name>
          <Page isRef="4" />
          <Parent isRef="4" />
          <Size>2</Size>
          <StartCap Ref="7" type="Cap" isKey="true">
            <Color>Black</Color>
          </StartCap>
        </line3>
        <PageHeader Ref="8" type="PageHeaderBand" isKey="true">
          <Brush>[255:255:255]</Brush>
          <CanGrow>False</CanGrow>
          <ClientRectangle>0,0,0,125</ClientRectangle>
          <Components isList="true" count="8">
            <invoiceLabel Ref="9" type="Text" isKey="true">
              <Border>Adv[169:169:169];1;Solid;[169:169:169];1;Solid;[169:169:169];1;Solid;[169:169:169];1;Solid;False;4;Black</Border>
              <Brush>[176:196:222]</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>450.1,0,200,37.5</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,20.25,Bold</Font>
              <HorAlignment>Center</HorAlignment>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>invoiceLabel</Name>
              <Page isRef="4" />
              <Parent isRef="8" />
              <Text>Invoice</Text>
              <TextBrush>[0:0:0]</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </invoiceLabel>
            <orderDateTextBox Ref="10" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>550,91,100,20</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10</Font>
              <HorAlignment>Right</HorAlignment>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>orderDateTextBox</Name>
              <Page isRef="4" />
              <Parent isRef="8" />
              <Text>{ds.OrderDate}</Text>
              <TextBrush>Black</TextBrush>
              <TextFormat Ref="11" type="CustomFormat" isKey="true">
                <StringFormat>d</StringFormat>
              </TextFormat>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </orderDateTextBox>
            <orderIDTextBox Ref="12" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>550,71.4,100,20</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10</Font>
              <HorAlignment>Right</HorAlignment>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>orderIDTextBox</Name>
              <Page isRef="4" />
              <Parent isRef="8" />
              <Text>{ds.OrderID}</Text>
              <TextBrush>Black</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </orderIDTextBox>
            <orderIDLabel Ref="13" type="Text" isKey="true">
              <Brush>[176:196:222]</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>449.8,71.3,100,19.79</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10,Bold</Font>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>orderIDLabel</Name>
              <Page isRef="4" />
              <Parent isRef="8" />
              <Text>Order ID:</Text>
              <TextBrush>[0:0:0]</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </orderIDLabel>
            <label2 Ref="14" type="Text" isKey="true">
              <Brush>[176:196:222]</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>449.8,91,100,19.79</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10,Bold</Font>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>label2</Name>
              <Page isRef="4" />
              <Parent isRef="8" />
              <Text>Order Date:</Text>
              <TextBrush>[0:0:0]</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </label2>
            <StartPoint2 Ref="15" type="Stimulsoft.Report.Components.StiStartPointPrimitive" isKey="true">
              <ClientRectangle>550,71.4,0,0</ClientRectangle>
              <Linked>True</Linked>
              <Name>StartPoint2</Name>
              <Page isRef="4" />
              <Parent isRef="8" />
              <ReferenceToGuid>de617d5f14ac42128ca76596732287f7</ReferenceToGuid>
            </StartPoint2>
            <EndPoint3 Ref="16" type="Stimulsoft.Report.Components.StiEndPointPrimitive" isKey="true">
              <ClientRectangle>550,111,0,0</ClientRectangle>
              <Linked>True</Linked>
              <Name>EndPoint3</Name>
              <Page isRef="4" />
              <Parent isRef="8" />
              <ReferenceToGuid>de617d5f14ac42128ca76596732287f7</ReferenceToGuid>
            </EndPoint3>
            <picture1 Ref="17" type="Image" isKey="true">
              <AspectRatio>True</AspectRatio>
              <Border>All;Transparent;0;None;False;4;Black</Border>
              <Brush>[255:255:255]</Brush>
              <ClientRectangle>0,0,191.3,71.4</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Image>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</Image>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>picture1</Name>
              <Page isRef="4" />
              <Parent isRef="8" />
              <Stretch>True</Stretch>
            </picture1>
          </Components>
          <Conditions isList="true" count="0" />
          <Linked>True</Linked>
          <Name>PageHeader</Name>
          <Page isRef="4" />
          <Parent isRef="4" />
        </PageHeader>
        <customerGroupHeader Ref="18" type="GroupHeaderBand" isKey="true">
          <Brush>[255:255:255]</Brush>
          <ClientRectangle>0,0,0,120</ClientRectangle>
          <Components isList="true" count="8">
            <shippingAddressLabel Ref="19" type="Text" isKey="true">
              <Border>Adv[169:169:169];1;Solid;[169:169:169];1;Solid;[169:169:169];1;Solid;[169:169:169];1;Solid;False;4;Black</Border>
              <Brush>[176:196:222]</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>350,0,300,19.79</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,9.75,Bold</Font>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>shippingAddressLabel</Name>
              <Page isRef="4" />
              <Parent isRef="18" />
              <Text>Shipping Address</Text>
              <TextBrush>[0:0:0]</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </shippingAddressLabel>
            <billingAddressLabel Ref="20" type="Text" isKey="true">
              <Border>Adv[169:169:169];1;Solid;[169:169:169];1;Solid;[169:169:169];1;Solid;[169:169:169];1;Solid;False;4;Black</Border>
              <Brush>[176:196:222]</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>0,0,300,19.79</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,9.75,Bold</Font>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>billingAddressLabel</Name>
              <Page isRef="4" />
              <Parent isRef="18" />
              <Text>Billing Address</Text>
              <TextBrush>[0:0:0]</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </billingAddressLabel>
            <qtyLabel Ref="21" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>0,100,50,19.79</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,9.75,Bold</Font>
              <HorAlignment>Center</HorAlignment>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>qtyLabel</Name>
              <Page isRef="4" />
              <Parent isRef="18" />
              <Text>QTY</Text>
              <TextBrush>[0:0:0]</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </qtyLabel>
            <productDescLabel Ref="22" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>50,100,400,19.79</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,9.75,Bold</Font>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>productDescLabel</Name>
              <Page isRef="4" />
              <Parent isRef="18" />
              <Text>Product Description</Text>
              <TextBrush>[0:0:0]</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </productDescLabel>
            <unitPriceLabel Ref="23" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>450,100,100,19.79</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,9.75,Bold</Font>
              <HorAlignment>Right</HorAlignment>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>unitPriceLabel</Name>
              <Page isRef="4" />
              <Parent isRef="18" />
              <Text>Unit Price</Text>
              <TextBrush>[0:0:0]</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </unitPriceLabel>
            <totalLabel Ref="24" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>550,100,99.8,19.79</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,9.75,Bold</Font>
              <HorAlignment>Right</HorAlignment>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>totalLabel</Name>
              <Page isRef="4" />
              <Parent isRef="18" />
              <Text>Total</Text>
              <TextBrush>[0:0:0]</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </totalLabel>
            <billingAddressTextBox Ref="25" type="Text" isKey="true">
              <Border>Adv[169:169:169];1;Solid;[169:169:169];1;Solid;[169:169:169];1;Solid;[169:169:169];1;Solid;False;4;Black</Border>
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>0,19.8,300,60</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,8</Font>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>billingAddressTextBox</Name>
              <Page isRef="4" />
              <Parent isRef="18" />
              <Text>{ds.BillingAddress}</Text>
              <TextBrush>Black</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </billingAddressTextBox>
            <shippingAddressTextBox Ref="26" type="Text" isKey="true">
              <Border>Adv[169:169:169];1;Solid;[169:169:169];1;Solid;[169:169:169];1;Solid;[169:169:169];1;Solid;False;4;Black</Border>
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>350,19.79,300,60</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,8</Font>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>shippingAddressTextBox</Name>
              <Page isRef="4" />
              <Parent isRef="18" />
              <Text>{ds.ShippingAddress}</Text>
              <TextBrush>Black</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </shippingAddressTextBox>
          </Components>
          <Condition>{ds.City}</Condition>
          <Conditions isList="true" count="0" />
          <Linked>True</Linked>
          <Name>customerGroupHeader</Name>
          <Page isRef="4" />
          <Parent isRef="4" />
        </customerGroupHeader>
        <Detail Ref="27" type="DataBand" isKey="true">
          <Brush>[255:255:255]</Brush>
          <CanGrow>False</CanGrow>
          <ClientRectangle>0,0,0,20</ClientRectangle>
          <Components isList="true" count="5">
            <qtyTextBox Ref="28" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>0,0,50,19.79</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10</Font>
              <HorAlignment>Center</HorAlignment>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>qtyTextBox</Name>
              <Page isRef="4" />
              <Parent isRef="27" />
              <Text>{ds.Quantity}</Text>
              <TextBrush>Black</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </qtyTextBox>
            <productNameTextBox Ref="29" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>49.8,0,400,19.79</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,8</Font>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>productNameTextBox</Name>
              <Page isRef="4" />
              <Parent isRef="27" />
              <Text>{ds.ProductName}</Text>
              <TextBrush>Black</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </productNameTextBox>
            <unitPriceTextBox Ref="30" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>450,0,100,19.79</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10</Font>
              <HorAlignment>Right</HorAlignment>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>unitPriceTextBox</Name>
              <Page isRef="4" />
              <Parent isRef="27" />
              <Text>{ds.UnitPrice}</Text>
              <TextBrush>Black</TextBrush>
              <TextFormat Ref="31" type="CustomFormat" isKey="true">
                <StringFormat>C</StringFormat>
              </TextFormat>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </unitPriceTextBox>
            <totalTextBox Ref="32" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>550,0,100,19.79</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10</Font>
              <HorAlignment>Right</HorAlignment>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>totalTextBox</Name>
              <Page isRef="4" />
              <Parent isRef="27" />
              <Text>{ds.Total}</Text>
              <TextBrush>Black</TextBrush>
              <TextFormat Ref="33" type="CustomFormat" isKey="true">
                <StringFormat>C</StringFormat>
              </TextFormat>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </totalTextBox>
            <line1 Ref="34" type="Shape" isKey="true">
              <BorderColor>169, 169, 169</BorderColor>
              <Brush>Transparent</Brush>
              <ClientRectangle>0.3,19.8,649.8,0.5</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Linked>True</Linked>
              <Name>line1</Name>
              <Page isRef="4" />
              <Parent isRef="27" />
              <ShapeType Ref="35" type="Stimulsoft.Report.Components.ShapeTypes.StiDiagonalUpLineShapeType" isKey="true" />
              <Size>2</Size>
            </line1>
          </Components>
          <Conditions isList="true" count="0" />
          <Filters isList="true" count="0" />
          <Linked>True</Linked>
          <Name>Detail</Name>
          <Page isRef="4" />
          <Parent isRef="4" />
          <Sort isList="true" count="0" />
        </Detail>
        <customerGroupFooter Ref="36" type="GroupFooterBand" isKey="true">
          <Brush>[255:255:255]</Brush>
          <ClientRectangle>0,0,0,76.04</ClientRectangle>
          <Components isList="true" count="6">
            <freightLabel Ref="37" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>450,26.2,100,20</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10,Bold</Font>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>freightLabel</Name>
              <Page isRef="4" />
              <Parent isRef="36" />
              <Text>Shipping:</Text>
              <TextBrush>[0:0:0]</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </freightLabel>
            <freightTextBox Ref="38" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>549.8,26.2,100,20</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10</Font>
              <HorAlignment>Right</HorAlignment>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>freightTextBox</Name>
              <Page isRef="4" />
              <Parent isRef="36" />
              <Text>{ds.Freight}</Text>
              <TextBrush>Black</TextBrush>
              <TextFormat Ref="39" type="CustomFormat" isKey="true">
                <StringFormat>C</StringFormat>
              </TextFormat>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </freightTextBox>
            <subTotalLabel Ref="40" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>450,6,100,20</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10,Bold</Font>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>subTotalLabel</Name>
              <Page isRef="4" />
              <Parent isRef="36" />
              <Text>Sub Total:</Text>
              <TextBrush>[0:0:0]</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </subTotalLabel>
            <subtotalTextBox Ref="41" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>549.8,6,100,20</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10</Font>
              <HorAlignment>Right</HorAlignment>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>subtotalTextBox</Name>
              <Page isRef="4" />
              <Parent isRef="36" />
              <Text>{ds.Total}</Text>
              <TextBrush>Black</TextBrush>
              <TextFormat Ref="42" type="CustomFormat" isKey="true">
                <StringFormat>C</StringFormat>
              </TextFormat>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </subtotalTextBox>
            <label1 Ref="43" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>450,46,100,20</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10,Bold</Font>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>label1</Name>
              <Page isRef="4" />
              <Parent isRef="36" />
              <Text>Total:</Text>
              <TextBrush>[0:0:0]</TextBrush>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </label1>
            <grandTotalTextBox Ref="44" type="Text" isKey="true">
              <Brush>Transparent</Brush>
              <CanGrow>True</CanGrow>
              <ClientRectangle>550,45.4,100,20</ClientRectangle>
              <Conditions isList="true" count="0" />
              <Font>Arial,10</Font>
              <HorAlignment>Right</HorAlignment>
              <Linked>True</Linked>
              <Margins>0,0,0,0</Margins>
              <Name>grandTotalTextBox</Name>
              <Page isRef="4" />
              <Parent isRef="36" />
              <Text>Grand Total</Text>
              <TextBrush>Black</TextBrush>
              <TextFormat Ref="45" type="CustomFormat" isKey="true">
                <StringFormat>C</StringFormat>
              </TextFormat>
              <TextOptions>,,,,WordWrap=True,A=0</TextOptions>
            </grandTotalTextBox>
          </Components>
          <Conditions isList="true" count="0" />
          <Linked>True</Linked>
          <Name>customerGroupFooter</Name>
          <Page isRef="4" />
          <Parent isRef="4" />
        </customerGroupFooter>
        <PageFooter Ref="46" type="PageFooterBand" isKey="true">
          <Brush>[255:255:255]</Brush>
          <CanGrow>False</CanGrow>
          <ClientRectangle>0,0,0,31.3</ClientRectangle>
          <Components isList="true" count="1">
            <line2 Ref="47" type="HorizontalLinePrimitive" isKey="true">
              <ClientRectangle>0,29,650,1</ClientRectangle>
              <Color>169, 169, 169</Color>
              <EndCap Ref="48" type="Cap" isKey="true">
                <Color>Black</Color>
              </EndCap>
              <Linked>True</Linked>
              <Name>line2</Name>
              <Page isRef="4" />
              <Parent isRef="46" />
              <Size>2</Size>
              <StartCap Ref="49" type="Cap" isKey="true">
                <Color>Black</Color>
              </StartCap>
            </line2>
          </Components>
          <Conditions isList="true" count="0" />
          <Linked>True</Linked>
          <Name>PageFooter</Name>
          <Page isRef="4" />
          <Parent isRef="4" />
        </PageFooter>
      </Components>
      <Conditions isList="true" count="0" />
      <Guid>f02326e7f6574bdf8a8932f16ee1e835</Guid>
      <Margins>88.45,88.45,39,39</Margins>
      <Name>Page1</Name>
      <Report isRef="0" />
      <Watermark Ref="50" type="Stimulsoft.Report.Components.StiWatermark" isKey="true">
        <Font>Arial,100</Font>
        <TextBrush>[50:0:0:0]</TextBrush>
      </Watermark>
    </Page1>
  </Pages>
  <PreviewSettings>268435455</PreviewSettings>
  <PrinterSettings Ref="51" type="Stimulsoft.Report.Print.StiPrinterSettings" isKey="true" />
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
  <ReportAlias>ARNet Document</ReportAlias>
  <ReportChanged>4/18/2017 5:36:13 PM</ReportChanged>
  <ReportCreated>4/18/2017 5:36:13 PM</ReportCreated>
  <ReportDescription>ActiveReports Version: 3.1</ReportDescription>
  <ReportFile />
  <ReportGuid>7329680545894d069be80ce677c7b062</ReportGuid>
  <ReportImage isNull="true" />
  <ReportName>ARNet Document</ReportName>
  <ReportUnit>HundredthsOfInch</ReportUnit>
  <ReportVersion>2016.3.0</ReportVersion>
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
    public class ARNet_Document : Stimulsoft.Report.StiReport
    {
        public ARNet_Document()        {
            this.InitializeComponent();
        }

        #region StiReport Designer generated code - do not modify
        #endregion StiReport Designer generated code - do not modify
    }
}
</Script>
  <ScriptLanguage>CSharp</ScriptLanguage>
  <Styles isList="true" count="4">
    <Normal Ref="52" type="Stimulsoft.Report.StiStyle" isKey="true">
      <AllowUseBorderFormatting>False</AllowUseBorderFormatting>
      <AllowUseBorderSides>False</AllowUseBorderSides>
      <AllowUseHorAlignment>True</AllowUseHorAlignment>
      <AllowUseVertAlignment>True</AllowUseVertAlignment>
      <Brush>Transparent</Brush>
      <Conditions isList="true" count="0" />
      <Font>Microsoft Sans Serif,10</Font>
      <Name>Normal</Name>
      <TextBrush>[0:0:0]</TextBrush>
    </Normal>
    <Heading1 Ref="53" type="Stimulsoft.Report.StiStyle" isKey="true">
      <AllowUseBorderFormatting>False</AllowUseBorderFormatting>
      <AllowUseBorderSides>False</AllowUseBorderSides>
      <AllowUseHorAlignment>True</AllowUseHorAlignment>
      <AllowUseVertAlignment>True</AllowUseVertAlignment>
      <Brush>Transparent</Brush>
      <Conditions isList="true" count="0" />
      <Font>Arial,16,Bold</Font>
      <Name>Heading1</Name>
      <TextBrush>Black</TextBrush>
    </Heading1>
    <Heading2 Ref="54" type="Stimulsoft.Report.StiStyle" isKey="true">
      <AllowUseBorderFormatting>False</AllowUseBorderFormatting>
      <AllowUseBorderSides>False</AllowUseBorderSides>
      <AllowUseHorAlignment>True</AllowUseHorAlignment>
      <AllowUseVertAlignment>True</AllowUseVertAlignment>
      <Brush>Transparent</Brush>
      <Conditions isList="true" count="0" />
      <Font>Times New Roman,14,Bold| Italic</Font>
      <Name>Heading2</Name>
      <TextBrush>Black</TextBrush>
    </Heading2>
    <Heading3 Ref="55" type="Stimulsoft.Report.StiStyle" isKey="true">
      <AllowUseBorderFormatting>False</AllowUseBorderFormatting>
      <AllowUseBorderSides>False</AllowUseBorderSides>
      <AllowUseHorAlignment>True</AllowUseHorAlignment>
      <AllowUseVertAlignment>True</AllowUseVertAlignment>
      <Brush>Transparent</Brush>
      <Conditions isList="true" count="0" />
      <Font>Arial,13,Bold</Font>
      <Name>Heading3</Name>
      <TextBrush>Black</TextBrush>
    </Heading3>
  </Styles>
</StiSerializer>