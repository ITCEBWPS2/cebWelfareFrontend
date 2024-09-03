import React from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  return (
    <section>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-3"></div>

          {/* Profile Card */}
          <div className="col-md-6">
            <div className="card profile_card">
              <div className="background-block">
                <img
                  src="https://live.staticflickr.com/7368/26944418810_1c420df3e3_b.jpg"
                  alt="profile-sample1"
                  className="background"
                />
              </div>
              <div className="profile-thumb-block">
                <img
                  src="http://kashyapvadi.000webhostapp.com/img/author_image.png"
                  style={{ width: "120px", height: "99px" }}
                  alt="profile-image"
                  className="profile"
                />
              </div>
              <div className="card-content">
                <span style={{ fontSize: "20px", fontWeight: 600 }}>
                  Kashyap Vadi
                </span>
                <a href="#">
                  <img
                    src="https://kashyapvadi132.000webhostapp.com/uoload/profile1/edit.svg"
                    className="edt_icon"
                    alt="edit"
                  />
                </a>
                <div className="icon-block">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Box Section */}
      <div className="box">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div className="box-part text-center bg-light">
                <img
                  src="https://kashyapvadi132.000webhostapp.com/uoload/profile1/address.svg"
                  className="icon_bottom_s"
                  alt="address"
                />
                <div className="title">
                  <h4>Address</h4>
                </div>
                <div className="text">
                  <span>
                    Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.
                    Assum decore te sed. Elitr scripta ocurreret qui ad.
                  </span>
                </div>
                <a href="#">Learn More</a>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div className="box-part text-center bg-light">
                <img
                  src="https://kashyapvadi132.000webhostapp.com/uoload/profile1/company.svg"
                  className="icon_bottom_s"
                  alt="company"
                />
                <div className="title">
                  <h4>Company</h4>
                </div>
                <div className="text">
                  <span>
                    Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.
                    Assum decore te sed. Elitr scripta ocurreret qui ad.
                  </span>
                </div>
                <a href="#">Learn More</a>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div className="box-part text-center bg-light">
                <img
                  src="https://kashyapvadi132.000webhostapp.com/uoload/profile1/gift.svg"
                  className="icon_bottom_s"
                  alt="benefits"
                />
                <div className="title">
                  <h4>Benefits Provided</h4>
                </div>
                <div className="text">
                  <span>
                    Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.
                    Assum decore te sed. Elitr scripta ocurreret qui ad.
                  </span>
                </div>
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
