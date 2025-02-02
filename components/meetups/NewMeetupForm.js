import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <div className={pending ? classes.disabled : classes.actions}>
      <button disabled={pending}>
        {pending ? "submitting..." : "Add Meetup"}
      </button>
    </div>
  );
}

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  async function submitHandler() {
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    // const { title, image, address, description } = meetupData;

    // if (
    //   title.trim() === "" ||
    //   !image.trim().startsWith("https") ||
    //   address.trim() === "" ||
    //   description.trim() === ""
    // ) {
    //   return;
    // }
    await props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} action={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <Submit />
      </form>
    </Card>
  );
}

export default NewMeetupForm;
