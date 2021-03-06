## Client-Side Image Validation Prototype ##

A prototype to demonstrate client-side image validation using JavaScript.

Client-side image validation was added to an existing project to help ensure that potentially malicious files (i.e. renamed scripts) cannot be uploaded and served up in the web app.

----------

**How Images are Validated**

----------

Image validation is performed by reading the first few bits of an uploaded image file (using the asynchronous [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader "FileReader") object) to determine the file's signature.  These signatures are also referred to as "magic numbers".

A valid PNG, GIF or JPG file is rendered as a thumbnail and the MIME type is logged to the console.

An invalid file will result in an alert advising the user that the uploaded file is not valid, and the file will not be rendered.

Test images (including a renamed EXE) are available in the test_images directory.

----------

**Running the App Locally**

----------

To run the app locally:

1. Make sure that [Ruby](https://www.ruby-lang.org/en/documentation/installation/) is installed.
2. Make sure that the [Sinatra](https://github.com/sinatra/sinatra) gem is installed.  *Note that installing the Sinatra gem will install other gems necessary to run the app locally, such as rack.*
3. Navigate to the directory which contains **app.rb** in a terminal (command prompt) session.
4. Run the following command to launch the Sinatra web server:

	`ruby app.rb`

To open the app locally once it is running via *ruby*, use the following URL:

[http://localhost:4567](http://localhost:4567/)

----------