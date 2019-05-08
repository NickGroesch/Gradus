import React from "react";
import "./style.css";

function Landing() {
  return (
    <div>
      <div className="welcome">Welcome to GRADUS</div>
      <div className="intro">
        <p>
          Gradus is a simple-yet-powerful composition software designed to
          revolutionize the music classroom. With a staggeringly large database
          of exercises and unfathomably insightful music algorithms, Gradus is
          disrupting the academic music environment. Create and solve
          counterpoint exercises in real-time. Witness the power of immediate
          feedback on every note you type. Excited? So are we. Excited to
          announce the versatility and ease-of-use of Gradus. Because now, with
          Gradus' Melody Generator*, anyone can create a melody in seconds!
        </p>
      </div>
      <div className="info-box">
        <div>
          <p className="title"> How to use Gradus</p>
        </div>
        <div>
          <ol type="1">
            <li>
              Sign in or sign up. We'll keep you up to date with the all the
              latest Gradus features and updates. Plus, We won't spam you
              because we haven't added email functionality yet, win-win!
            </li>
            <li>
              Once you sign in, you'll be taken to your Dashboard. Here you can
              pick any counterpoint exercises to complete and view past
              assignments (coming soon!).
            </li>
            <li>
              Once you pick an assignment you'll find yourself on the exercise
              page. You'll see the selected counterpoint exercise on the top of
              the screen and a blank music staff below. Start composing! No
              MIDI? No Problem! We provide a handy virtual keyboard.
            </li>
            <li>
              Done? Frustrated? Both? Simply save anytime and come back later
              (coming soon!)
            </li>
          </ol>
        </div>
      </div>
      <div className="info-box">
        <div>
          <p className="title"> About Us </p>
        </div>
        <div className="about-body">
          <p>
            Like any heroes of the modern age, we're just software developers.
            The word "visionaries" get tossed around but Gradus is simply the
            result of our hard work and ingenuity. We know Gradus is lauded as:
            <br />
            <br />
            "The most revolutionary piece of software of the 21st century"
            -MIT**
            <br />
            <br />
            "An awe-inspiring magnum opus of accomplishment. [Gradus] will
            unlock the potential of billions of musicians" -Wallstreet
            Journal**.
            <br />
            <br />
            But we try and stay humble. Once your shock at the magnitude of
            Gradus' power has worn off, please check out our other projects.
          </p>

          <a className="portfolio-link" href="...">
            Nick Groesch
          </a>
          <a className="portfolio-link" href="...">
            Michael Campbell
          </a>
          <a className="portfolio-link" href="...">
            Sarah Tam
          </a>
          <a className="portfolio-link" href="...">
            Mahfouz Mahmoud
          </a>
          <a className="portfolio-link" href="www.kyhongle.com">
            Ky Le
          </a>
        </div>
      </div>
      <footer>
        *some features still being forged in our brains **not provably true.
      </footer>
    </div>
  );
}
export default Landing;
