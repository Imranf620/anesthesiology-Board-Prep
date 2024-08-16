import { useForm } from 'react-hook-form';
import Input from '../../components/UI/Input';
import { useEffect, useState } from 'react';

const RequestForm = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src =
      'https://desk.zoho.com/portal/api/feedbackwidget/991422000000329051?orgId=853322296&displayType=iframe';
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <iframe
      id="zsfeedbackFrame"
      width="890"
      height="570"
      name="zsfeedbackFrame"
      scrolling="no"
      allowtransparency="false"
      frameborder="0"
      border="0"
      src="https://desk.zoho.com/support/fbw?formType=AdvancedWebForm&fbwId=edbsnc1904954f33d5668d9f2e5ade1934787af82bffeebf6fe7f81c5dd58f958b109&xnQsjsdp=edbsn7838afe7d01854fe54e84fea9c4d9f1c&mode=showNewWidget&displayType=iframe"
    ></iframe>
  );
};
export default RequestForm;
