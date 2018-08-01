import React, { Component } from 'react';

//https://www.codeply.com/go/tjC0LYqJHA/bootstrap-tab-wizard-with-progress-bar
class ProgresiveWizard extends Component {
    render() {
        return (	
            <div>
        <div className="container" id="myWizard">
            <div className="row">
                <div className="col-xs-10 col-md-10">
                    <h3>
                        <span className="glyphicon glyphicon-lock"></span>
                    &nbsp;Secure Checkout</h3>
                </div>
                <div className="col-xs-2 col-md-2 pull-right">
                <img src="https://trustsealinfo.websecurity.norton.com/images/vseal.gif" /></div>
            </div>
            <hr />
      <div className="progress">
          <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="4" style={ {width: '25%'}}>
              Step 1 of 4
          </div>
      </div>
      <div className="navbar">
          <div className="navbar-inner">
              <ul className="nav nav-pills nav-wizard">
                  <li className="active">
                      <a className="hidden-xs" href="#step1" data-toggle="tab" data-step="1">1. Details</a>
                      <a className="visible-xs" href="#step1" data-toggle="tab" data-step="1">1.</a>
                      <div className="nav-arrow"></div>
                  </li>
                  <li className="disabled">
                      <div className="nav-wedge"></div>
                      <a className="hidden-xs" href="#step2" data-toggle="tab" data-step="2">2. Shipping</a>
                      <a className="visible-xs" href="#step2" data-toggle="tab" data-step="2">2.</a>
                      <div className="nav-arrow"></div>
                  </li>
                  <li className="disabled">
                      <div className="nav-wedge"></div>
                      <a className="hidden-xs" href="#step3" data-toggle="tab" data-step="3">3. Payment</a>
                      <a className="visible-xs" href="#step3" data-toggle="tab" data-step="3">3.</a>
                      <div className="nav-arrow"></div>
                  </li>
                  <li className="disabled">
                      <div className="nav-wedge"></div>
                      <a className="hidden-xs" href="#step4" data-toggle="tab" data-step="4">4. Review</a>
                      <a className="visible-xs" href="#step4" data-toggle="tab" data-step="4">4.</a>
                  </li>
              </ul>
          </div>
      </div>
      <div className="tab-content">
          <div className="tab-pane fade in active" id="step1">
              <h3>1. Details</h3>
              <div className="well">
                  <div className="row">
                      <div className="col-xs-12 col-md-12">
                          <div className="form-group ">
                              <label>Email</label>
                              <input className="form-control input-lg" placeholder="Email"/>
                              <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                              <span id="inputError2Status" className="sr-only">(error)</span>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-xs-6 col-md-6">
                          <div className="form-group">
                              <label>First Name</label>
                              <input className="form-control input-lg"/>
                          </div>
                      </div>
                      <div className="col-xs-6 col-md-6 pull-right">
                          <div className="form-group">
                              <label>Last Name</label>
                              <input className="form-control input-lg"/>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-xs-12 col-md-13">
                          <div className="form-group">
                              <label>Address</label>
                              <input className="form-control input-lg"/>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-xs-7 col-md-7">
                          <div className="form-group">
                              <label>Suburb</label>
                              <input className="form-control input-lg"/>
                          </div>
                      </div>
                      <div className="col-xs-5 col-md-5 pull-right">
                          <div className="form-group">
                              <label>Postcode</label>
                              <input className="form-control input-lg"/>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-xs-7 col-md-7">
                          <div className="form-group">
                              <label>State</label>
                              <select id="billing:region_id" name="billing[region_id]" title="State/Province" className="form-control  input-lg validate-select required-entry" defaultvalue="">
                                  <option value="">Please select region, state or province</option>
                                  <option value="485">Australia Capital Territory</option>
                                  <option value="486">New South Wales</option>
                                  <option value="487">Northern Territory</option>
                                  <option value="488">Queensland</option>
                                  <option value="489">South Australia</option>
                                  <option value="490">Tasmania</option>
                                  <option value="491">Victoria</option>
                                  <option value="492">Western Australia</option>
                              </select>
                          </div>
                      </div>
                      <div className="col-xs-5 col-md-5 pull-right">
                          <div className="form-group">
                              <label>Phone</label>
                              <input type="tel" className="form-control input-lg" placeholder="(  ) "/>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-xs-12">
                          <button className="btn btn-primary btn-lg btn-block next" type="submit">Continue&nbsp;<span className="glyphicon glyphicon-chevron-right"></span></button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="tab-pane fade" id="step2">
              <h3>2. Shipping</h3>
              <div className="well">
                  <div className="row">
                      <div className="col-xs-12 col-md-12">
                          <h3>Shipping To</h3>
                          <address>
                              <strong id="customer-name"></strong><br/>
                              <div id="address-line1"></div>
                              <div id="address-line2"></div>
                              <abbr title="Phone">P:</abbr> ( ) 
                              <a href="mailto:#"></a>
                          </address>
                      </div>
                  </div>
                  <div>
                      <dl className="sp-methods">
                          <dt>Express Shipping</dt>
                          <dd>
                              <ul>
                                  <li>
                                      <input name="shipping_method" type="radio" value="flatrate2_flatrate2" id="s_method_flatrate2_flatrate2" className="radio"/>
                                      <label for="s_method_flatrate2_flatrate2">1-2 Business Days                                                                                                 <span className="price">$14.95</span>                                                            </label>
                                  </li>
                              </ul>
                          </dd>
                          <dt>Standard Shipping </dt>
                          <dd>
                              <ul>
                                  <li>
                                      <input name="shipping_method" type="radio" value="flatrate_flatrate" id="s_method_flatrate_flatrate" className="radio"/>
                                      <label for="s_method_flatrate_flatrate">2-4 Business Days                                                                                                 <span className="price">$9.95</span>                                                            </label>
                                  </li>
                              </ul>
                          </dd>
                      </dl>
                  </div>
                  <div className="row">
                      <div className="col-xs-12 col-md-12">
                          <p>It is our priority to deliver your order as quickly as possible, which is why we offer same day dispatch on orders placed before 12:00pm AEST Monday to Friday.<br/>
                              Any order placed after 12:00pm AEST or on a weekend will be dispatched the next business day.</p>
                      </div>
                  </div>
                <div className="btn-group btn-group-justified" role="group" aria-label="">
                        <div className="btn-group btn-group-lg" role="group" aria-label="">
                          <button className="btn btn-default back" type="button"><span className="glyphicon glyphicon-chevron-left">&nbsp;Back</span></button>
                      
                        </div>
                  <div className="btn-group btn-group-lg" role="group" aria-label="">
                          <button className="btn btn-primary btn-lg btn-block next" type="submit">Continue&nbsp;<span className="glyphicon glyphicon-chevron-right"></span></button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="tab-pane fade" id="step3">
              <div className="row">
                  <div className="panel panel-default credit-card-box">
                      <div className="panel-heading display-table">
                          <div className="row display-tr">
                              <h3 className="panel-title display-td">Payment Details</h3>
                              <div className="display-td">
                                  <img className="img-responsive pull-right" src="http://i76.imgup.net/accepted_c22e0.png"></img>
                              </div>
                          </div>
                      </div>
                      <div className="panel-body">
                          <form role="form" id="payment-form">
                              <div className="row">
                                  <div className="col-xs-12">
                                      <div className="form-group">
                                          <label for="cardNumber">CARD NUMBER</label>
                                          <div className="input-group">
                                              <input type="tel" className="form-control" name="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="" autofocus=""/>
                                              <span className="input-group-addon">
                                                  <i className="fa fa-credit-card"></i>
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="row">
                                  <div className="col-xs-7 col-md-7">
                                      <div className="form-group">
                                          <label for="cardExpiry">
                                              <span className="hidden-xs">EXPIRATION</span>
                                              <span className="visible-xs-inline">EXP</span> DATE
                                          </label>
                                          <input type="tel" className="form-control" name="cardExpiry" placeholder="MM / YY" autocomplete="cc-exp" required=""/>
                                      </div>
                                  </div>
                                  <div className="col-xs-5 col-md-5 pull-right">
                                      <div className="form-group">
                                          <label for="cardCVC">CV CODE</label>
                                          <input type="tel" className="form-control" name="cardCVC" placeholder="CVC" autocomplete="cc-csc" required=""/>
                                      </div>
                                  </div>
                              </div>
                <div className="btn-group btn-group-justified" role="group" aria-label="">
                        <div className="btn-group btn-group-lg" role="group" aria-label="">
                          <button className="btn btn-default back" type="button">Back</button>
                      
                        </div>
                  <div className="btn-group btn-group-lg" role="group" aria-label="">
                                      <button className="btn btn-primary btn-lg btn-block next" type="submit">Continue</button>
                                  </div>
                              </div>
                              <div className="row" style={{display:'none'}}>
                                  <div className="col-xs-12">
                                      <p className="payment-errors"></p>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          <div className="tab-pane fade" id="step4">
              <div className="well">
                  <h3>4. Review Order</h3> Add another almost done step here..
                  <div className="row">
                      <div className="col-xs-12 col-md-12">
                          <table className="table">
                              <colgroup><col/>
                                  <col width="1"/>
                                  <col width="1"/>
                              </colgroup><thead>
                                  <tr>
                                      <th className="name">Product Name</th>
                                      <th className="qty">Qty</th>
                                      <th className="total">Subtotal</th>
                                  </tr>
                              </thead>
                              <tfoot>
                                  <tr>
                                      <td  className="a-right" colspan="2">
                                          Tax            </td>
                                      <td  className="a-right"><span className="price">$3.18</span></td>
                                  </tr>
                                  <tr>
                                      <td  className="a-right" colspan="2">
                                          Subtotal    </td>
                                      <td  className="a-right">
                                          <span className="price">$18.18</span>    </td>
                                  </tr>
                                  <tr>
                                      <td  className="a-right" colspan="2">
                                          Shipping &amp; Handling (Express Shipping - 1-2 Business Days)    </td>
                                      <td  className="a-right">
                                          <span className="price">$14.95</span>    </td>
                                  </tr>
                              </tfoot>
                              <tbody>
                                  <tr>
                                      <td>
                                          <h3 className="product-name">Hulk Singlet Black </h3>
                                          <dl className="item-options">
                                              <dt>Size</dt>
                                              <dd>M                                    </dd>
                                          </dl>
                                      </td>
                                      <td className="a-center">1</td>
                                      <td>
                                          <span className="cart-price">
                                              <span className="price">$20.00</span>                            </span>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-xs-12 col-md-12">
                          <div className="form-group ">
                              <label>Gift Cards</label>
                              <input className="form-control input-lg" placeholder="XXXXX-XXXX-XXXXX"/>
                              <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                              <span id="inputError2Status" className="sr-only">(error)</span>
                          </div>
                      </div>

                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-md-12">
                      <div className="form-group">
                        <label>Sign up for Newsletter</label>
                        <input type="checkbox"/>
                      </div>
                    </div>
                  </div>
                <div className="btn-group btn-group-justified" role="group" aria-label="">
                        <div className="btn-group btn-group-lg" role="group" aria-label="">
                          <button className="btn btn-default back" type="button">Back</button>
                      
                        </div>
                  <div className="btn-group btn-group-lg" role="group" aria-label="">
                      <button className="btn btn-success next" type="submit">Place Order</button>
                  </div>
                </div>
              </div>

          </div>
      </div></div>


  <div id="push"></div>
</div>)
    }
}

export default ProgresiveWizard;