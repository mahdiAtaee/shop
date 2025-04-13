import React from 'react'

const Address = () => {
    return (
        <form className="needs-validation" noValidate="">
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">نام کوچک</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder=""
                        defaultValue=""
                        required=""
                    />
                    <div className="invalid-feedback">نام معتبر مورد نیاز است</div>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">نام خانوادگی</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder=""
                        defaultValue=""
                        required=""
                    />
                    <div className="invalid-feedback">نام خانوادگی معتبر مورد نیاز است</div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="username">نام کاربری</label>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="نام کاربری"
                        required=""
                    />
                    <div className="invalid-feedback" style={{ width: "100%" }}>
                        نام کاربری شما مورد نیاز است
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="email">
                    ایمیل <span className="text-muted">(اختیاری)</span>
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                />
                <div className="invalid-feedback">
                    لطفا یک آدرس ایمیل معتبر برای ارسال به روز رسانی وارد کنید
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="address">آدرس</label>
                <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="خیابان آذر پلاک 11"
                    required=""
                />
                <div className="invalid-feedback">
                    لطفا آدرس حمل و نقل خود را وارد کنید.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="address2">
                    آدرس 2 <span className="text-muted">(اختیاری)</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="آپارتمان یا مجموعه"
                />
            </div>
            <div className="row">
                <div className="col-md-5 mb-3">
                    <label htmlFor="country">کشور</label>
                    <select
                        className="custom-select d-block w-100"
                        id="country"
                        required=""
                    >
                        <option value="">انتخاب...</option>
                        <option>ایران</option>
                    </select>
                    <div className="invalid-feedback">
                        لطفا یک کشور معتبر را انتخاب کنید
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="state">شهر</label>
                    <select className="custom-select d-block w-100" id="state" required="">
                        <option value="">انتخاب...</option>
                        <option>ارومیه</option>
                    </select>
                    <div className="invalid-feedback">لطفا یک کشور معتبر ارائه کنید</div>
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="zip">کد پستی</label>
                    <input
                        type="text"
                        className="form-control"
                        id="zip"
                        placeholder=""
                        required=""
                    />
                    <div className="invalid-feedback">کد پستی مورد نیاز است</div>
                </div>
            </div>
            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    id="same-address"
                />
                <label className="custom-control-label" htmlFor="same-address">
                    آدرس حمل و نقل همان آدرس صورت حساب من است
                </label>
            </div>
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="save-info" />
                <label className="custom-control-label" htmlFor="save-info">
                    این اطلاعات را برای دفعه بعد ذخیره کنید
                </label>
            </div>
            <hr className="mb-4" />
            <h4 className="mb-3">پرداخت</h4>
            <div className="d-block my-3">
                <div className="custom-control custom-radio">
                    <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        className="custom-control-input"
                        defaultChecked=""
                        required=""
                    />
                    <label className="custom-control-label" htmlFor="credit">
                        کارت اعتباری
                    </label>
                </div>
                <div className="custom-control custom-radio">
                    <input
                        id="debit"
                        name="paymentMethod"
                        type="radio"
                        className="custom-control-input"
                        required=""
                    />
                    <label className="custom-control-label" htmlFor="debit">
                        کارت اعتباری
                    </label>
                </div>
                <div className="custom-control custom-radio">
                    <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        className="custom-control-input"
                        required=""
                    />
                    <label className="custom-control-label" htmlFor="paypal">
                        پی پال
                    </label>
                </div>
            </div>
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit">
                ادامه پرداخت
            </button>
        </form>
    )
}

export default Address