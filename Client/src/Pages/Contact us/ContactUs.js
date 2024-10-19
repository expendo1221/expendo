import React, { useState } from "react";
import { Layout, Input, Button, Form, message, Typography, Row, Col, Card } from "antd";
import styles from "./ContactUs.module.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = (values) => {
    setLoading(true);
    // Simulate a form submission process (you can replace this with actual backend integration)
    setTimeout(() => {
      setLoading(false);
      message.success("Your message has been sent successfully!");
    }, 1500);
  };

  return (
    <Layout>
      <Content className={styles.content}>
        <Row justify="center" className={styles.contactRow}>
          <Col xs={24} sm={20} md={16} lg={12}>
            <Card className={styles.contactCard}>
              <Title level={2} className={styles.pageTitle}>
                Contact Us
              </Title>

              <Text className={styles.pageDescription}>
                We'd love to hear from you! Whether you have a question about our app or want to give us feedback, feel free to contact us.
              </Text>

              <Form
                layout="vertical"
                onFinish={handleSubmit}
                className={styles.contactForm}
                initialValues={{ remember: true }}
              >
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter your name!" }]}
                >
                  <Input placeholder="Enter your full name" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                  label="Message"
                  name="message"
                  rules={[{ required: true, message: "Please enter your message!" }]}
                >
                  <Input.TextArea rows={4} placeholder="Enter your message" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Send Message
                  </Button>
                </Form.Item>
              </Form>

              <div className={styles.contactDetails}>
                <Title level={4}>Our Office</Title>
                <Text>
                  22 Namdeep building, Shri Namdeo CHS, 90ft <br />
                  Vidyavihar, Mumbai<br />
                  Email: info@yexpendo.com <br />
                  Phone: +91 9920351043
                </Text>

                <div className={styles.socialMedia}>
                  <Title level={4}>Follow Us</Title>
                  <Row>
                    <Col span={6}>
                      <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </Col>
                    <Col span={6}>
                      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        Twitter
                      </a>
                    </Col>
                    <Col span={6}>
                      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        Instagram
                      </a>
                    </Col>
                    <Col span={6}>
                      <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </Col>
                  </Row>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className={styles.mapContainer}>
                <Title level={4}>Our Location</Title>
                <div className={styles.map}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7541.561956913423!2d72.896245!3d19.073365!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6279e6fa183%3A0x8b414750f755e236!2sSomaiya%20Vidyavihar%20University!5e0!3m2!1sen!2sus!4v1729315553902!5m2!1sen!2sus"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ContactUs;

